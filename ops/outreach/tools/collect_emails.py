#!/usr/bin/env python3
"""Polite email collector for prospect websites (Full Census / Full Showroom).

Input : CSV with at least a `website` column (roster or Maps merge output).
Output: <input>-emails.csv with columns: website, email, source_url, method.

Usage : python3 collect_emails.py prospects.csv
        python3 collect_emails.py prospects.csv --delay 3

Behavior: for each site, fetches the homepage plus common contact paths,
extracts mailto: links and visible addresses, dedupes, and writes one row
per (site, email). Rate-limited, identified user agent, honors a plain
"Disallow: /" in robots.txt, and never retries a host that errors twice.
Run this from a machine with normal web access (not Claude's container).
"""
import csv, re, sys, time, argparse
from urllib.parse import urljoin, urlparse
from urllib import robotparser
import urllib.request

UA = "FullCensusContactFinder/1.0 (+https://fullcensus.org; business contact discovery; hello: henosadhana@gmail.com)"
PATHS = ["", "/contact", "/contact-us", "/about", "/about-us"]
EMAIL_RE = re.compile(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}")
SKIP_DOMAINS = ("wixpress.com", "sentry.io", "example.com", "email.com", "domain.com")
SKIP_PREFIX = ("noreply", "no-reply", "donotreply")


def fetch(url, timeout=15):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept": "text/html"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        if "html" not in (r.headers.get("Content-Type") or ""):
            return ""
        return r.read(500_000).decode("utf-8", errors="replace")


def robots_ok(base):
    try:
        rp = robotparser.RobotFileParser()
        rp.set_url(urljoin(base, "/robots.txt"))
        rp.read()
        return rp.can_fetch(UA, base)
    except Exception:
        return True  # no robots.txt or unreadable — proceed politely


def emails_from(html):
    found = {}
    for m in re.finditer(r'href=["\']mailto:([^"\'?]+)', html, re.I):
        found[m.group(1).strip().lower()] = "mailto"
    for m in EMAIL_RE.finditer(html):
        e = m.group(0).lower()
        found.setdefault(e, "text")
    out = {}
    for e, method in found.items():
        dom = e.split("@")[-1]
        if dom in SKIP_DOMAINS or any(e.startswith(p) for p in SKIP_PREFIX):
            continue
        if dom.endswith((".png", ".jpg", ".svg", ".gif", ".webp")):  # asset false-positives
            continue
        out[e] = method
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("csv_in")
    ap.add_argument("--delay", type=float, default=2.0, help="seconds between requests")
    args = ap.parse_args()

    rows = list(csv.DictReader(open(args.csv_in, newline="", encoding="utf-8-sig")))
    site_col = next((c for c in rows[0] if c.lower() in ("website", "url", "site")), None)
    if not site_col:
        sys.exit("input CSV needs a website/url column")

    out_path = args.csv_in.rsplit(".", 1)[0] + "-emails.csv"
    seen_sites, results = set(), []
    for i, row in enumerate(rows):
        site = (row.get(site_col) or "").strip()
        if not site:
            continue
        if not site.startswith("http"):
            site = "https://" + site
        base = f"{urlparse(site).scheme}://{urlparse(site).netloc}"
        if base in seen_sites:
            continue
        seen_sites.add(base)
        if not robots_ok(base):
            print(f"[skip robots] {base}")
            continue
        errors, found = 0, {}
        for path in PATHS:
            if errors >= 2:
                break
            url = urljoin(base, path)
            try:
                html = fetch(url)
                for e, method in emails_from(html).items():
                    found.setdefault(e, (url, method))
            except Exception as ex:
                errors += 1
            time.sleep(args.delay)
        for e, (src, method) in found.items():
            results.append({"website": base, "email": e, "source_url": src, "method": method})
        print(f"[{i+1}/{len(rows)}] {base}: {len(found)} email(s)")

    with open(out_path, "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=["website", "email", "source_url", "method"])
        w.writeheader()
        w.writerows(results)
    print(f"\nwrote {len(results)} rows -> {out_path}")


if __name__ == "__main__":
    main()
