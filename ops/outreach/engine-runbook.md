# The Outbound Engine — national care-home playbook

**What this is now.** The engine's campaign is Full Census, nationwide, in one
vertical: small licensed care homes. Not a Washington agency, not tint shops.
Every email lands on that state's own page, in that state's own license
vocabulary, and the offer is the one already proven at Serene Lynnwood.

Basis: the RareCurve teardown (their machine, $3,700 CAC, patched with
6-month lock-in contracts) minus the parts that make them fragile.

## The market, measured (DataForSEO, 2026-08-27)

| State | Homes on Google Maps | License term families search |
|---|---:|---|
| California | **5,241** | board and care / RCFE |
| Florida | **2,818** | adult family care home |
| Washington | **2,188** | adult family home |
| Arizona | **1,824** | assisted living home |
| **Total, four states** | **12,071** | |

Cross-check: CDSS publishes **5,790** licensed RCFEs serving six or fewer in
California. Our independent Maps count says 5,241. Two sources within 10% —
the market sizing is real, not an estimate.

Agency-side competition, same tool: "adult family home marketing", "rcfe
marketing", "board and care marketing", "residential assisted living
marketing" all return **zero search volume**. Nobody is fishing these owners
in any state.

## The number that changes the plan

12,071 homes is not 12,071 sendable prospects. Work it through:

| Stage | Count | Why |
|---|---:|---|
| Homes on Maps, 4 states | 12,071 | measured |
| After filtering chains, brokers, wrong facility types, closed | ~9,000 | the spine builder drops ~25% |
| With a findable email (PRA + crawl + listing) | **~4,500** | roughly half, optimistically |
| Sends at 3 touches | **~13,500** | the entire four-state universe |

**The whole four-state email universe is under one month of engine capacity
at 15–18K sends/month.** So capacity is not the constraint — *email coverage
is*. Two consequences, and they both save money:

1. **Build ~12–15 inboxes, not 30.** Half the infra spend (~$1,500 instead of
   ~$3,000) covers this list comfortably over a 6–8 week run. Scale inboxes
   only when states 5–10 are ready, not before.
2. **The records requests matter more than adding states.** Every state PRA
   that comes back with emails does more for volume than a new state page.
   Chase Florida's (Chapter 119 is the most permissive sunshine law of the
   four) and California's next.

And the channel nobody should skip: **phone coverage is ~100%**. All 12,071
homes have a listed number, and these owners answer their phones. Phone is
not the fallback here — it is the co-equal channel, and it is available today
with no warmup and no records request.

## Expected results, honestly

| Reply rate | Conversations | Booked calls | Closes | New MRR |
|---|---:|---:|---:|---:|
| 0.5% (cold-email baseline) | ~68 | ~14 | ~5 | ~$5,000 |
| 1.5% (realistic here) | ~200 | ~40 | ~13 | ~$13,000 |

The case for the higher number, specifically in this vertical: Henos has a
real result in the exact business (Serene, filled in week one, $5,000/month
since), speaks the operators' language natively, and the email's first line
is verifiably true per prospect ("you're not on page one for [their city]").
That is a different animal from a generic agency blast. But 0.5% is what we
plan the budget against, and anything above it is upside.

Break-even stays trivial: **one Engine client at $1,000/month covers the
entire infrastructure.** Everything past client #1 is margin.

## The pipeline, end to end

```
state roster / Maps pull  →  tools/build_spine.py  →  wedge-ranked CSV
        ↓                                                    ↓
  records request (emails)  ────────────────────→  merge + verify
        ↓                                                    ↓
  website crawl (collect_emails.py)  ──────────→  segmented sequences
                                                             ↓
                          fullcensus.org/{state}/  →  Calendly  →  Supabase
```

Every stage exists in the repo today except the credentialed pull.

**Building a spine:**
```bash
export DFS_LOGIN=... DFS_PASSWORD=...     # app.dataforseo.com
python3 tools/build_spine.py california   # ~6 API calls, full population
python3 tools/build_spine.py florida
python3 tools/build_spine.py arizona
```
Output lands in `data/` — **gitignored on purpose**: this repo is served
publicly by GitHub Pages, so a committed prospect list would be downloadable
from the live site. Lists move through chat, never the repo.

## Segments, in send order

The spine ranks itself. Send in this order, because the opening line gets
weaker as you go down:

1. **No website** — "You have {reviews} five-star reviews and no website."
   Undeniable, personal, and true. Highest reply rate, start here.
2. **Unclaimed Google profile** — "Your Google listing isn't claimed, so
   you can't be found in Maps." Free fix offered = credibility.
3. **Website but not ranking** — needs the SERP proof line; save for once
   the first two segments are worked.

## Per-state sequence swaps

The 3-touch sequence in `outreach-kit.md` stays; three fields change:

| Field | WA | CA | FL | AZ |
|---|---|---|---|---|
| license word | adult family home | board and care | adult family care home | assisted living home |
| landing page | /washington/ | /california/ | /florida/ | /arizona/ |
| searched phrase | adult family home near me | board and care home near me | care home near me | residential assisted living |

Never send a state the wrong license word. Calling a California operator's
board and care an "adult family home" marks you as an out-of-state stranger
in the first sentence — it is the one mistake this whole architecture exists
to avoid.

## Rollout order

1. **California** — biggest list (5,241), open-data roster with no records
   request needed, and the sharpest mirror line in the country: families
   search "board and care," operators' own sites say "RCFE."
2. **Washington** — roster in hand, PRA filed 2026-08-27, local proof.
3. **Florida** — cleanest agency data, native small-home license, strongest
   records law. Fire the PRA early; it will likely return first.
4. **Arizona** — smallest of the four, run it as the control group.
5. Wisconsin next (same vocabulary as WA, zero retraining), then the six
   remaining draft states once their license terms are confirmed.

## Guardrails

- 20–25 sends/inbox/day, Tue–Thu, plain text, one link, postal address and
  a working opt-out on every send.
- Separate sending domain, warmed two weeks. Never the brand domains.
- Verify every address before it enters a sequence; bounces >3% kill a domain.
- Suppress prior contacts and opt-outs permanently.
- Kill rules: replies <0.2% after 5K sends → rewrite the angle, not the
  adjectives. Reply→booked <10% → the leak is the pitch or reply speed.
  Renewal <60% at month 4 → stop scaling acquisition and fix delivery.
  (That last one is the exact trap RareCurve papered over with contracts.)

## Status

**Built and in the repo**
- National state architecture: `/states/` plus 11 state pages generated from
  one data file, each in its own license vocabulary
- Verified market counts for CA, FL, AZ, WA
- `tools/build_spine.py` — pull, filter, wedge-rank, export
- `tools/collect_emails.py` — polite website crawler
- 3-touch sequence, call/voicemail/SMS scripts, compliance rules
- Conversion events wired; robots.txt and sitemap.xml shipped

**Waiting on Henos**
- DataForSEO API credentials → the full 12,071-home spine (~11 calls)
- ~12–15 inboxes on a warmed sending domain (revised down from 30)
- Records requests for CA and FL
- Verify license terminology for the 8 draft states before they go live
