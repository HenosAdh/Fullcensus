#!/usr/bin/env python3
"""Build a Full Census prospect spine for a state.

Two modes:

  # 1. Live pull from DataForSEO (needs credentials; gets the full population)
  export DFS_LOGIN=you@example.com DFS_PASSWORD=xxxx
  python3 tools/build_spine.py california

  # 2. Offline: process JSON already saved locally
  python3 tools/build_spine.py california --from data/raw/california.json

The MCP bridge caps responses at 10 records, so mode 1 is how the real
9,883-home list gets built: DataForSEO's REST API returns 1,000 per call,
so California is 6 calls, Florida 3, Arizona 2.

Output: data/prospects/<state>-spine.csv, wedge-ranked — no website first,
then unclaimed Google profiles, then everyone else. That ordering IS the
outreach order.
"""
import argparse, base64, csv, json, os, pathlib, sys, time
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parent.parent
STATES = {s["slug"]: s for s in json.loads((ROOT / "tools" / "states.json").read_text())["states"]}

# Search geometry per state: lat,lon,radius_km covering the state.
GEO = {
    "california": "36.7783,-119.4179,600",
    "florida": "27.9944,-81.7603,450",
    "arizona": "34.0489,-111.0937,420",
    "washington": "47.3,-120.5,320",
    "wisconsin": "44.5,-89.5,300",
    "oregon": "43.8,-120.5,320",
    "texas": "31.0,-99.0,600",
    "georgia": "32.7,-83.4,300",
    "michigan": "44.3,-85.6,350",
    "pennsylvania": "40.9,-77.8,280",
    "north-carolina": "35.6,-79.4,320",
}

CATEGORIES = ["assisted_living_facility"]

# Regional chains and national operators — not our client.
CHAINS = [
    "brookdale", "atria", "sunrise senior", "oakmont", "pacifica senior", "belmont village",
    "merrill gardens", "aegis living", "carlton senior", "cogir", "kensington", "meridian senior",
    "holiday by atria", "eskaton", "watermark", "leisure care", "life care", "prestige senior",
    "bonaventure", "frontier management", "legend senior", "five star senior", "capital senior",
    "sunrise of", "the villages", "hyatt", "marriott",
]
# Placement agencies / referral brokers — competitors, not prospects.
BROKERS = [
    "a place for mom", "placement", "referral", "senior advisor", "care advisor", "concierge care",
    "senior living advisor", "caring.com", "seniorly",
]
# Categories that mean "not a small residential home".
BAD_CATS = {"nursing_home", "hospital", "rehabilitation_center", "housing_complex",
            "apartment_complex", "apartment_building", "home_health_care_service_agency"}


def fetch_state(slug, max_records=None):
    login, pw = os.environ.get("DFS_LOGIN"), os.environ.get("DFS_PASSWORD")
    if not (login and pw):
        sys.exit("Set DFS_LOGIN and DFS_PASSWORD (DataForSEO API credentials from "
                 "app.dataforseo.com), or use --from to process a local JSON file.")
    auth = base64.b64encode(f"{login}:{pw}".encode()).decode()
    url = "https://api.dataforseo.com/v3/business_data/business_listings/search/live"
    out, offset = [], 0
    while True:
        payload = [{
            "categories": CATEGORIES,
            "location_coordinate": GEO[slug],
            "limit": 1000,
            "offset": offset,
        }]
        req = urllib.request.Request(
            url, data=json.dumps(payload).encode(),
            headers={"Authorization": "Basic " + auth, "Content-Type": "application/json"})
        with urllib.request.urlopen(req, timeout=120) as r:
            body = json.loads(r.read())
        task = body["tasks"][0]
        if task.get("status_code") != 20000:
            sys.exit(f"DataForSEO error: {task.get('status_message')}")
        result = (task.get("result") or [{}])[0]
        total = result.get("total_count", 0)
        items = result.get("items") or []
        out.extend(items)
        print(f"  offset {offset}: +{len(items)}  (total available {total})")
        offset += len(items)
        if not items or offset >= total or (max_records and offset >= max_records):
            break
        time.sleep(1)
    return out


def is_prospect(r):
    """Keep owner-operated small homes; drop chains, brokers, and big facilities."""
    name = (r.get("title") or "").lower()
    # Check the domain too: brokers often hide behind a neutral company name
    # (e.g. "Geriatric Solutions Unlimited" at freeseniorplacements.com).
    hay = name + " " + (r.get("domain") or "") + " " + (r.get("url") or "").lower()
    if any(c in hay for c in CHAINS) or any(b in hay for b in BROKERS):
        return False, "chain/broker"
    cats = set(r.get("category_ids") or [])
    if cats & BAD_CATS:
        return False, "wrong facility type"
    if ((r.get("work_time") or {}).get("work_hours") or {}).get("current_status") == "closed_forever":
        return False, "closed"
    votes = ((r.get("rating") or {}).get("votes_count")) or 0
    if votes > 120:          # small homes rarely accumulate this many reviews
        return False, "too large"
    return True, ""


def wedge(r):
    """Higher = contact sooner. No website is the hottest opening we have."""
    s = 0
    if not r.get("url"):
        s += 100
    if not r.get("is_claimed"):
        s += 50
    if r.get("phone"):
        s += 10
    rating = (r.get("rating") or {}).get("value") or 0
    votes = ((r.get("rating") or {}).get("votes_count")) or 0
    if rating >= 4.5:
        s += 15
    if 1 <= votes <= 40:
        s += 10
    return -s


def emails_from(r):
    return ";".join(c["value"] for c in (r.get("contact_info") or []) if c.get("type") == "mail")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("state", choices=sorted(GEO))
    ap.add_argument("--from", dest="src", help="local JSON file of listings instead of an API pull")
    ap.add_argument("--max", type=int, default=None, help="stop after N records")
    a = ap.parse_args()

    if a.src:
        raw = json.loads(pathlib.Path(a.src).read_text())
        items = raw if isinstance(raw, list) else raw.get("items", [])
    else:
        print(f"pulling {a.state} from DataForSEO...")
        items = fetch_state(a.state, a.max)

    st = STATES.get(a.state, {})
    region = st.get("name", a.state.title())
    rows, dropped = [], {}
    seen = set()
    for r in items:
        if (r.get("address_info") or {}).get("region") not in (region, st.get("abbr")):
            continue
        key = r.get("cid") or r.get("place_id")
        if not key or key in seen:
            continue
        seen.add(key)
        ok, why = is_prospect(r)
        if not ok:
            dropped[why] = dropped.get(why, 0) + 1
            continue
        ai = r.get("address_info") or {}
        rating = r.get("rating") or {}
        rows.append({
            "name": r.get("title", ""),
            "city": ai.get("city", ""),
            "zip": ai.get("zip", ""),
            "address": ai.get("address", ""),
            "phone": r.get("phone", ""),
            "website": r.get("url", ""),
            "email_found": emails_from(r),
            "rating": rating.get("value", ""),
            "reviews": rating.get("votes_count", 0) or 0,
            "claimed": "yes" if r.get("is_claimed") else "NO",
            "wedge": "NO WEBSITE" if not r.get("url") else ("UNCLAIMED GBP" if not r.get("is_claimed") else "has site"),
            "license_term": st.get("term", ""),
            "landing_page": f"https://fullcensus.org/{a.state}/",
            "maps_url": r.get("check_url", ""),
        })

    rows.sort(key=lambda x: (wedge({"url": x["website"], "is_claimed": x["claimed"] == "yes",
                                    "phone": x["phone"],
                                    "rating": {"value": x["rating"] or 0, "votes_count": x["reviews"]}}),
                             -int(x["reviews"] or 0)))

    outdir = ROOT / "data" / "prospects"
    outdir.mkdir(parents=True, exist_ok=True)
    out = outdir / f"{a.state}-spine.csv"
    with open(out, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()) if rows else ["name"])
        w.writeheader()
        w.writerows(rows)

    nosite = sum(1 for r in rows if r["wedge"] == "NO WEBSITE")
    unclaimed = sum(1 for r in rows if r["claimed"] == "NO")
    withmail = sum(1 for r in rows if r["email_found"])
    print(f"\n{a.state}: {len(rows)} prospects -> {out}")
    print(f"  no website: {nosite} | unclaimed profile: {unclaimed} | email already found: {withmail}")
    if dropped:
        print("  filtered out: " + ", ".join(f"{v} {k}" for k, v in dropped.items()))


if __name__ == "__main__":
    main()
