# Full Showroom — expansion plan (saved 2026-08-21)

The idea: replicate the Full Census playbook (niche full-service marketing agency:
website + Google Business Profile + local SEO + photography + Meta ads + one free
"audit" CTA) for **high-consumer-spend local shops**, starting with **lab-grown
diamond jewelers** and **window tint shops**.

## Brand name

**Full Showroom** — sibling of Full Census. Census = full beds; Showroom = full
bays, full cases, full floors. It stretches across every niche on the list
(diamond cases, tint bays, spa suites, closet showrooms, mattress floors).

Domain check (DataForSEO whois, 2026-08-21): of the "Full ___" candidates,
`fullbay.com`, `fullticket.com`, `fullbook.com`, `fullbooked.com`, `fullcounter.com`,
`fulltill.com`, `fullcapacity.com`, `fullregister.com` are ALL registered.
**`fullshowroom.com` was absent from the whois database — likely available.**
Verify + register immediately (grab `fullshowroom.org` too, to mirror fullcensus.org).
`fullcase.com` was also absent but is generic-short enough that it is probably
parked/premium.

## The laundry list — high-ticket local niches, ranked

US Google data, pulled 2026-08-21 via DataForSEO (volume = searches/month; CPC =
what one ad click costs — proof that ranking organically is worth real money).

### Tier 1 — beachheads (chosen)
| Niche | Money keyword | Vol/mo | CPC |
|---|---|---:|---:|
| Window tint / PPF shops | window tinting near me | 368,000 | $5.21 |
| | tint shop near me | 90,500 | $5.34 |
| | ceramic window tint | 33,100 | $3.38 |
| | paint protection film | 49,500 | $9.28 |
| | ppf near me | 27,100 | $11.30 |
| | commercial window tinting | 4,400 | $19.45 |
| Lab-grown diamond jewelers | lab grown diamonds | 135,000 | $7.37 |
| | lab grown diamond engagement rings | 90,500 | $12.56 |
| | lab grown diamond rings | 90,500 | $7.18 |
| | custom engagement rings | 49,500 | $8.83 |
| | jewelry stores near me | 673,000 | $3.52 |
| | permanent jewelry near me | 40,500 | $1.80 |

### Tier 2 — same playbook, adjacent buyers
| Niche | Money keyword | Vol/mo | CPC |
|---|---|---:|---:|
| Car wraps / ceramic coating / detailing | car wrap near me | 90,500 | $4.53 |
| | ceramic coating near me | 33,100 | $7.06 |
| | auto detailing near me | 74,000 | $2.59 |
| | car audio installation near me | 60,500 | $2.55 |
| Med spas / aesthetics | med spa near me | 110,000 | $5.47 |
| | laser hair removal near me | 110,000 | $16.45 |
| | coolsculpting near me | 22,200 | $8.32 |
| | tattoo removal near me | 40,500 | $11.70 |
| | microblading near me | 49,500 | $1.92 |
| | hair transplant cost | 33,100 | $11.56 |

### Tier 3 — home big-ticket installers (highest CPCs on the board)
| Niche | Money keyword | Vol/mo | CPC |
|---|---|---:|---:|
| Custom closets | custom closets near me | 4,400 | **$47.41** |
| | closet systems | 60,500 | $6.70 |
| Kitchen & bath remodel | bathroom remodel near me | 90,500 | **$29.84** |
| | kitchen remodel near me | 74,000 | $17.74 |
| Garage floors | garage floor coating | 49,500 | $6.14 |
| | epoxy garage floor | 40,500 | $10.14 |
| Pools / hot tubs / saunas | pool builders near me | 14,800 | $10.92 |
| | hot tubs near me | 49,500 | $4.59 |
| | sauna for home | 40,500 | $3.76 |
| | cold plunge tub | 27,100 | $6.37 |
| Home wellness / golf sims | golf simulator for home | 27,100 | $3.87 |
| | home theater installation | 1,900 | $10.56 |
| Yard: turf / hardscape / fence / concrete | artificial turf installation | 9,900 | $14.76 |
| | hardscaping near me | 12,100 | $10.80 |
| | fence installation near me | 27,100 | $12.56 |
| | concrete contractors near me | 60,500 | $11.38 |
| | landscape lighting installation | 1,900 | $8.32 |
| | christmas light installation near me (seasonal) | 14,800 | $7.56 |
| | outdoor kitchen contractors | 1,600 | $17.01 |

### Tier 4 — showroom retail & events (huge volume, bigger incumbents)
| Niche | Money keyword | Vol/mo | CPC |
|---|---|---:|---:|
| Furniture / mattress showrooms | furniture stores near me | 1,000,000 | $4.23 |
| | mattress stores near me | 301,000 | $11.33 |
| Wedding venues / photographers | wedding venues near me | 301,000 | $2.50 |
| | wedding photographer near me | 8,100 | $4.82 |
| Dental implants / smile (heavily lead-gen'd) | dental implants near me | 90,500 | **$39.71** |
| Solar / roofing (lead-gen shark tank) | roof replacement cost | 18,100 | $19.97 |
| | solar panels near me | 5,400 | $16.26 |

**Read on the data:** "near me" + $5–$47 CPCs = owners already paying dearly per
click; the Full Census pitch ("rank organically, own the asset forever") ports
cleanly. Tier 1–2 shops are owner-operated and under-marketed like AFHs were.
Tier 3 has the fattest CPCs (custom closets $47!). Tier 4 is volume but fights
national chains and lead-gen networks — later.

## Landing page

Draft lives at `preview/full-showroom/index.html` (same repo pattern as
`preview/candlelight-mill-creek`). It replicates the fullcensus.org framework:
marquee → pill nav → hero ("Get found. Get booked. Get full.") → market-proof
section with a Google SERP mockup ("your showroom here") → stat shell → services
grid → statement banner → niche laundry-list shell → 4 steps → free **Showroom
Audit** form (same Supabase `leads` table, `route: "fullshowroom"`, `source:
"showroom-audit"`, FormSubmit email copy, Calendly swap) → footer.
Accent color: ice (#8fd6e6) instead of Full Census gold, diamond logo mark.

## The offer & pricing (drafted 2026-08-21)

Full Census sells "$1,000, no retainer." Full Showroom keeps the own-your-asset
DNA but adds the retainer — these shops have 5–20× the ticket size of an AFH bed
inquiry and expect ongoing service. Client-facing version: `pitch.html`.

| Tier | Price | What's in it |
|---|---|---|
| **The Build** (one-time) | **$2,500** (founding rate $1,500, first 5 shops/city) | Website (theirs forever), GBP setup, on-site photo shoot, call tracking |
| **The Engine** (retainer) | **$1,000/mo** — 3-mo start, then month-to-month | Local SEO + Maps, content/buyer guides, reviews engine, 1-page monthly report |
| **Full Throttle** | **$1,750/mo** + ad budget ($500–1,500/mo, their Meta account) | Engine + managed FB/IG ads, seasonal pushes, cost-per-booking reporting |

Break-even pitch: one PPF package ($1,500–2,000) or one lab-grown ring sale
($3,000+) covers the retainer. Everything registered in the client's name;
"fire me and keep the asset" is the trust lever, same as Full Census.
Target: 10 Engine clients = $10k MRR + builds.

## Outbound playbook — the growth motion

For owner-operated shops the owner IS the decision maker, and their contact
info is public on Google Maps. Motion: build list → 3-touch cold email (or
call/text — shops answer their phones) → pitch link → audit call → close.

**List building (proven today):** DataForSEO Business Listings API pulls every
tint shop / jeweler in a radius with phone, website, rating, review count,
claimed status. Sample pull, Seattle +60km, Aug 21 — the wedge finds itself:

| Shop | City | Signal |
|---|---|---|
| Tinting To-Go | Kent | 5.0★, 279 reviews, **NO WEBSITE** |
| Perfect Shine Auto Salon | (Kent area) | 4.8★, 274 reviews, **NO WEBSITE** |
| Everett Watch & Jewelry Repair | Everett | 4.8★, 338 reviews, **NO WEBSITE** |
| California Tint of Everett | Everett | 4.9★, 272 reviews, thin site |
| Azul Window Tint | Kent | 4.9★, 262 reviews |

A 5★ shop with hundreds of reviews and no website is the perfect first email:
they're already great, they're just invisible off-Maps. Rank prospects:
(1) no website, (2) unclaimed GBP, (3) site but not ranking, (4) ranking.
Note: the jeweler category needs manual cleaning (returns T.J. Maxx, COACH etc.
— filter to independents by title/category).

**Sequence (email; same script works for walk-in/call/text):**
1. *Day 0 — the mirror.* "Googled 'tint shop near me' in Kent — you're not
   there, [competitor] is. You have 279 five-star reviews and no website; you're
   losing jobs you already earned. 3-minute pitch: [pitch link]. Worth 15 min?"
2. *Day 3 — the proof.* Full Census/Serene story: found in week one, $5,000/mo
   since. "Same system, your shop, live in a week."
3. *Day 7 — the walk-away.* "Founding rate ($1,500 build) holds for 5 shops in
   [city]; taking it to [neighbor competitor] after that. Either way — claim
   your Google profile, it's free and you're losing calls without it."

**Compliance & deliverability (do not skip):** B2B cold email is legal under
CAN-SPAM if: truthful from/subject, physical postal address in footer, working
unsubscribe honored promptly, no deception. Send from a separate domain
(e.g. getfullshowroom.com) so the main domain's reputation is never at risk;
warm it 2 weeks; 20–40 sends/day max; plain text, one link, no attachments.
Direct mail variant: the rack-card play from the Full Census kit aimed at shop
counters ("Google shows [competitor] first. Want to see why? Scan this.").

## Niche radar v2 — scoring for the actual Full Census pattern (2026-08-21)

The first laundry list scored consumer spend. The real Full Census pattern is
narrower and stronger — five tests:
(1) buyers search "near me" with money in hand, (2) almost NO agencies pitch
the owners ("[niche] marketing" search volume ≈ 0 = open water; compare
"dental marketing" 1,900/mo at $58/click = shark tank), (3) the operator has
FIXED CAPACITY that bleeds money while empty, (4) one fill = months or years
of recurring revenue, (5) owners sit on a public license roster (free outbound
list) and already pay a lead middleman they resent.

US Google data, 2026-08-21, DataForSEO:

| Niche | Buyer demand | Agencies fishing the owners | Census-pattern fit |
|---|---|---|---|
| **Child care: daycares, preschools, in-home** | "daycare near me" **450,000/mo · $9.07** (+ preschool 135k, montessori 74k) | "daycare marketing" **90/mo**, "child care marketing" **0** | **Perfect.** Licensed slots = capacity; one enrollment ≈ $12–24k/yr recurring; state rosters public (WA DCYF); middleman tax = Care.com/Winnie. The AFH archetype with kids. |
| **Small assisted living / care homes, other states** | "assisted living near me" 165,000/mo · $12.91 | "assisted living marketing" 390/mo | **It's literally Full Census** in TX (residential care homes), CA (RCFE), GA/PA (personal care homes), OR/MI (adult foster care). Zero new playbook. |
| **Dog boarding / dog daycare / pet resorts** | 201,000 + 74,000 + 27,100 (cat)/mo · $4–6 | "pet boarding marketing" **10/mo** | Strong. Kennel capacity, weekly recurring daycare, county licenses, middleman = Rover. Lower ticket than childcare. |
| **Sober living / recovery residences** | 22,200/mo · **$13.76** (+ halfway house 9.9k) | "sober living marketing" **10/mo** | Beds again ($600–1,200/bed/mo). NARR registries. Caution: work only with certified residences; paid ads restricted (LegitScript) — which makes organic SEO the unlock. |
| **CDL / driving schools** | 301,000/mo (driving) + 49,500 (CDL) | "driving school marketing" **0** | Dark horse. $3–8k CDL tickets, state-licensed rosters, seat/truck capacity. |
| **Adult day care** | 22,200/mo · $5.23 | ~0 | Not a new brand — bolt onto Full Census itself (same families, same referrers). |
| RV parks / campgrounds | 301k + 450k/mo but $0.83–1.32 CPC | 50/mo | Big traffic, weak economics, OTA-dominated. Hold. |
| Funeral homes | 201,000/mo · $4.49 | 110/mo | Real but slow, sensitive sales cycle. Hold. |
| Therapists | 368,000/mo · $22.90 | 480/mo · **$27.55** | Demand is titanic but the pond is already fished, and Headway/Alma are eating it. Pass for retainers. |
| Dentists / med spas / law / HVAC / roofing | huge | $58–112 per click on the AGENCY side | Shark tanks. Pass. |

**Read:** child care is the crown jewel new vertical — it beats tint/jewelry on
every Census-pattern axis (recurring revenue per fill, license rosters,
middleman resentment, zero agency competition) and Henos's care-sector story
ports straight across. Multi-state Full Census is the highest-confidence
compounding move. Pet boarding is the clean #2 new vertical.

## Status (2026-08-21)

Built and in the repo:
- [x] Landing page (`index.html`) — with Guides in the nav
- [x] Pitch & pricing page (`pitch.html`)
- [x] Guides library (`guides/`) — owner playbook + 3 keyword-validated
      sample ranking guides (14.8k/12.1k/9.9k/22.2k searches/mo topics)
- [x] Outreach kit (`outreach/outreach-kit.md`) — send-ready 3-touch email
      sequence, call/VM/SMS scripts, compliance rules
- [x] Prospect list v1 — 40 Puget Sound tint/PPF shops, wedge-ranked
      (4 with no website, 1 unclaimed GBP); CSV delivered off-repo,
      regenerate via DataForSEO Business Listings

Waiting on Henos (accounts/payment needed):
- [ ] Register fullshowroom.com + .org + sending domain
- [ ] Calendly "Free Showroom Audit" event type
- [ ] GTM / GA4 / Clarity properties for the new brand
- [ ] Warm the sending domain (2 weeks) → start the sequence

## Next steps
1. Register fullshowroom.com (+ .org) and a separate sending domain for
   outreach. Update canonical/OG URLs in the page.
2. Stand it up as its own repo/Pages site (CNAME) once the domain exists —
   or serve from a subfolder to start.
3. Point hello@ email at the new domain (page currently lists the Full Census phone).
4. Create a second Calendly event type named "Free Showroom Audit" (page reuses
   the occupancy-audit link until then).
5. Replicate the guides/ SEO playbook per niche ("ceramic vs carbon tint",
   "lab-grown vs natural resale value", "tint laws by state" etc.) — this is what
   ranked Full Census clients.
6. First outreach: tint shops + independent jewelers in WA using the pitch-deck
   pattern (`pitch-deck.html`), swapping occupancy math for bay/ticket math.
