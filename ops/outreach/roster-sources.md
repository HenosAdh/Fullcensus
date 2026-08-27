# Roster extraction — where every state's list comes from

The one-line answer on email: **no state publishes operator emails in its
public roster.** Every state hands you name, address, phone, licensee, and
capacity for free. Email is a second step, and there are only four ways to
get it. Plan around that instead of hunting for a magic download.

## What each state gives you

| State | License term | Public roster | Format | Email in it? | Pull difficulty |
|---|---|---|---|---|---|
| **Washington** | Adult Family Home | [DSHS AFH Locator](https://fortress.wa.gov/dshs/adsaapps/lookup/AFHPubLookup.aspx) | CSV/Excel export from the search UI | **no** | 🟢 easy |
| **California** | Residential Care Facility for the Elderly | [CDSS Community Care Licensing facilities (open data)](https://data.chhs.ca.gov/dataset/ccl-facilities) | CSV, updated regularly | **no** | 🟢 easy |
| **Wisconsin** | Adult Family Home | [WI DHS Division of Quality Assurance provider directory](https://www.dhs.wisconsin.gov/guide/) | Provider search + downloadable lists | **no** | 🟡 medium |
| **Oregon** | Adult Foster Home | [ODHS licensed facility directory](https://www.oregon.gov/odhs/providers-partners/licensing/Pages/default.aspx) | Provider lists | **no** | 🟡 medium |
| **Michigan** | Adult Foster Care Home | [Michigan LARA adult foster care facility search](https://www.michigan.gov/lara) | Search UI, exportable | **no** | 🟡 medium |
| **Georgia** | Personal Care Home | [Georgia DCH Healthcare Facility Regulation directory](https://dch.georgia.gov/) | Facility directory | **no** | 🟡 medium |
| **Pennsylvania** | Personal Care Home | [PA DHS personal care home directory](https://www.dhs.pa.gov/) | Provider directory | **no** | 🟡 medium |
| **Texas** | Assisted Living Facility, Type A or Type B | [Texas HHSC long-term care provider search](https://www.hhs.texas.gov/providers/long-term-care-providers/assisted-living-facilities-alf) | Provider search + LTC datasets | **no** | 🟡 medium |
| **North Carolina** | Family Care Home | [NC DHSR facility lists](https://info.ncdhhs.gov/dhsr/) | Downloadable facility lists by type | **no** | 🟢 easy |
| **Arizona** | Assisted Living Home | [AZDHS licensed facility search](https://www.azdhs.gov/licensing/) | Search + downloadable data | **no** | 🟢 easy |
| **Florida** | Adult Family Care Home | [Florida AHCA / FloridaHealthFinder](https://quality.healthfinder.fl.gov/) | Facility locator with data downloads | **no** | 🟢 easy |

Every URL above is a public licensing directory. None of them need a records
request for the SPINE (name, address, phone, capacity) — that part is free
and immediate in every state.

## The four email lanes, ranked by yield per hour

**1. Public records request — the bulk lane (best yield, zero cost).**
State agencies collect a licensee email at application. It is business
contact information, generally disclosable. One request per state ≈ most of
that state's emails. WA request sent 2026-08-27; the same letter works in
every state with the statute swapped:

| State | Statute to cite | Where to send |
|---|---|---|
| Washington | RCW 42.56 | DSHSPublicDisclosure@dshs.wa.gov ✅ sent |
| California | California Public Records Act, Gov. Code 7920 et seq. | CDSS Public Records Office |
| Wisconsin | Wis. Stat. 19.31–19.39 | DHS Records Custodian |
| Texas | Texas Public Information Act, Gov. Code 552 | HHSC Public Information |
| Florida | Fla. Stat. 119 (very strong sunshine law — fastest in the country) | AHCA Public Records |
| Georgia | O.C.G.A. 50-18-70 | DCH Open Records |
| Others | state open-records act | agency records officer |

Florida's Chapter 119 is the most permissive public-records law of the group;
if one state returns emails quickly, it is likely to be Florida.

**2. Website crawl — highest quality, works today.**
`tools/collect_emails.py` (already in the repo). Feed it the roster's website
column merged from Google Maps. Only the minority of homes have sites, but
those emails are owner-monitored and convert best.

**3. Google Maps enrichment — fills phone + website, not email.**
DataForSEO business listings by category and radius. Its real job is finding
the website so lane 2 can crawl it, and confirming who is invisible online
(which IS the pitch).

**4. Paid enrichment — last resort, capped.**
Hunter/Apollo-class tools are weak on gmail-based home businesses. Cap at
~$100 and only for high-value gaps.

## What to do while emails are pending

The roster's **phone column is 100% populated on day one** and these owners
answer their phones. Do not let the email lane block the campaign:
- Call/voicemail/SMS scripts are in `outreach-kit.md`
- Direct mail works unusually well here — the roster gives a *verified
  licensed mailing address* for every single home in the country

## Order of operations per state

1. Download the roster (free, minutes) → the spine, keyed on license number
2. Fire the records request (free, ~2–4 weeks) → the bulk email column
3. Maps merge → websites + phones
4. Crawl the websites found → immediate, high-quality emails
5. Verify everything before sending; suppress prior contacts and opt-outs
6. Segment by the wedge: no website → unclaimed profile → invisible on Maps

## Priority order for the first three campaigns

1. **Washington** — roster in hand, PRA pending, Serene proof is local, and
   Henos knows the vocabulary cold.
2. **California** — 5,790 licensed homes of six or fewer, open-data roster
   with no records request needed for the spine, and families search
   "board and care" while operators' sites say "RCFE." Biggest prize.
3. **Wisconsin** — identical vocabulary to WA ("adult family home"), so the
   Washington sequence ports with zero rewriting.

Florida is the dark horse: cleanest agency data in the country, a native
small-home license (adult family care home), and the strongest sunshine law.
