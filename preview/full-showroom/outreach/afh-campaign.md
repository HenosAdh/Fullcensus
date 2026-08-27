# Campaign 1 — Adult Family Homes → fullcensus.org

The engine's first campaign runs on the proven offer: WA adult family homes,
landing on fullcensus.org (live case study, live audit form, live analytics).
~6,500 untouched homes × 3 touches ≈ 20K sends — a perfect first quarter.
De-risk the machine on the niche that already converts; then point it at tint.

## Email aggregation — five lanes, in order of yield

### Lane 1 · The DSHS roster (today, free, 2 minutes — Henos)
AFHs are DSHS-licensed, so the authoritative list is public:
- **AFH Locator** (fortress.wa.gov → DSHS ADSA lookup): search with no
  filters (or county by county), then use the **Excel/CSV export**. Fields:
  license #, facility name, licensee, address, city, county, phone, capacity,
  specialty designations.
- Same data also on the WA geospatial portal (geo.wa.gov, "DSHS Adult Family
  Homes") with a download button.
- These sites are blocked from Claude's container — download and drop the CSV
  in the repo (or send it in chat) and Claude does everything after that.
- The export has **no email column**. That's what lanes 2–4 are for. It IS
  the canonical spine: every merge keys on license #.

### Lane 2 · Public records request (send today, the bulk email unlock)
DSHS collects licensee emails during licensing; under the WA Public Records
Act (RCW 42.56) the business contact record is generally disclosable. One
request ≈ most of the roster's emails, at $0. Send via the DSHS public
records portal (dshs.wa.gov → Public Records) or the records officer email.

**Draft (ready to send):**

> Subject: Public records request — licensed adult family home roster
>
> Dear Public Records Officer,
>
> Under RCW 42.56, I request the current roster of all licensed adult family
> homes in Washington State, in electronic format (CSV or Excel), including
> for each home: facility name, license number, licensee name, mailing
> address, telephone number of record, and **email address of record**.
>
> If any portion is exempt, please release the remainder and cite the
> exemption. I'm happy to receive the records on a rolling basis. This
> request is for business contact information only.
>
> Thank you,
> Henos Adhana · Full Census · henosadhana@gmail.com · (206) 203-4944

Expect an acknowledgment within 5 business days (statutory) and fulfillment
in ~2–4 weeks. This lands right as the sending domains finish warming.

### Lane 3 · Google Maps merge (Claude, done on demand)
DataForSEO business listings, WA-wide: **2,188 senior-care listings** sized
on 2026-08-26 (categories assisted_living_facility + retirement_home; needs
filtering — big facilities, brokers like A Place For Mom, rehab centers mix
in). Yields websites + phones to merge onto the roster spine. Note: most
AFHs are NOT on Maps — that absence is itself the pitch, and the roster
tells us exactly who's invisible.

### Lane 4 · Website email crawl (script ready: tools/collect_emails.py)
For the minority of homes with websites (roster merge + Maps `url` field):
crawl homepage + /contact + /about for mailto: and visible emails. The
script is polite (rate-limited, identified user agent, robots-aware) and
outputs email + source URL + confidence. Run it from your machine (outbound
web access is restricted in Claude's container); Claude processes the output.

### Lane 5 · Gap fill for the remainder
- Enrichment vendors (Hunter/Snov/Apollo): weak for gmail-based home
  businesses — spend only on high-value gaps, ~$100 cap.
- **Phone/SMS**: AFH owners answer their phones; Quo is already connected.
  Voicemail + follow-up text script is in outreach-kit.md.
- Direct mail: the rack-card play to the licensed address — uniquely strong
  here because the roster gives a verified mailing address for every home.

## Merge, hygiene, segmentation (Claude)
1. Spine = roster (license #). Merge Maps + crawl + PRA emails onto it.
2. Suppress: current/past clients, everyone already contacted ("6,500 I
   haven't hit" — need your contacted list to subtract), opt-outs forever.
3. Verify every email (MillionVerifier-class) before it enters a sequence;
   bounces >3% kill domains.
4. Segment exactly like the wedge: ① no website (hottest — most of the
   roster) ② website but invisible on Maps ③ visible but outrankable.

## The AFH 3-touch (adapted from outreach-kit.md; lander = fullcensus.org)

**Email 1 — the mirror** · Subject: `{home} isn't showing up on Google`
> Hi {first} — I searched "adult family home near me" from {city} this week.
> {competitor} comes up. {home} doesn't — even though you're licensed for
> {capacity} residents and they have empty beds too.
> My family runs Serene, an AFH in Lynnwood. When I put it on Google, a
> family found us and moved in the first week — that resident has been
> $5,000/month ever since. I do exactly this for Washington homes now:
> fullcensus.org
> Worth 15 minutes this week?
> — Henos Adhana · Full Census · (206) 203-4944
> [postal address] · Reply "no thanks" and I won't email again.

**Email 2 — the proof + free value** · Subject: `how Serene filled a bed in week one`
> The whole story, with the actual Google result: fullcensus.org — and one
> thing worth reading even if we never talk: my guide on placement agencies
> vs. listing your own beds (you keep 100% when families find YOU).
> One website. One price. Yours forever — no retainer.

**Email 3 — the walk-away** · Subject: `working down the {county} list`
> Last one from me. I work county by county and {home} was near the top for
> {county}. If it's a no, no hard feelings — but claim your free Google
> Business Profile either way; it takes 20 minutes and you're losing calls
> without it. If it's a maybe: [Calendly] — 30 minutes, I'll show you
> exactly where families in {city} are finding other homes instead of yours.

Compliance: CAN-SPAM + WA CEMA (truthful subject/headers — every line above
is literally true per-prospect), postal address + working opt-out on every
send, business emails only.

## Sequence of operations
1. **Today (Henos):** download the roster CSV; send the PRA request; send
   Claude the "already contacted" list for suppression.
2. **Today (Claude, once CSV lands):** build the spine, run the Maps merge,
   segment, produce the send-ready file for the subset with emails found.
3. **Weeks 1–2:** domains warm while the PRA fulfills. Crawl runs.
4. **Week 3:** first ramped sends to verified segment ①.
5. **PRA arrives:** bulk email column lands on the spine → full 6,500 rollout.
