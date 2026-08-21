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

## Next steps
1. Register fullshowroom.com (+ .org). Update canonical/OG URLs in the page.
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
