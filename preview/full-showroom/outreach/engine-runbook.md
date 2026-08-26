# The Outbound Email Engine — launch runbook

Basis: the RareCurve Stack Teardown + RareCurve Model analyses (Aug 25–26).
Their machine, our engine: they feed a $999–1,299/mo productized local-SEO
offer entirely by outbound (commission-only setters, $150 per booked show,
CAC ≈ $3,700/client). We run the same funnel shape with cold email doing the
setter's job — target CAC under $300 — and with retention earned by
own-the-asset delivery instead of their 6-month contractual lock.

## What we copy, replace, and refuse

**Copy (proven by their P&L):**
- Outbound-only demand. They run a ~$1.3M/yr book with 2.5 organic visits/mo.
  Inbound is optional; the engine is the business.
- The funnel: cold touch → free personalized "you are invisible" report →
  booked call on a white-labeled calendar → productized close. Our "free
  Occupancy/Showroom Audit" IS their "AI Visibility Report" — we invented it
  independently; they validate it at scale.
- Productized 2-tier pricing with an activation fee (ours: Build $2,500 /
  Engine $1,000 / Full Throttle $1,750 — already on pitch.html).
- Prepay incentive pulls cash forward (waive part of the Build on prepay).
- Their stack *selection*: GTM + GA4 + Meta Pixel + session replay + CRM.

**Replace (the arbitrage):**
- Human setters → warmed email farm. Their CAC $3,700; a $3K email quarter
  producing ~12–15 clients prices a booked-show at ~$20–40 vs their $150,
  and a close at ~$200–300. LTV:CAC goes from their 2.3× to >10×.
- GoHighLevel ($97–497/mo) → phase 2. Supabase leads table + FormSubmit +
  Calendly already cover CRM-lite at $0.

**Refuse (their three landmines, per the teardown):**
1. No 6-month lock / auto-renew traps. We sell month-to-month after a 3-month
   start; "fire me and keep the asset." Their renewal cliff (break-even at
   36% renewal) exists BECAUSE retention is contractual, not delivered.
2. No self-declared review schema, no anonymous testimonials. Real clients,
   real names, or nothing.
3. No consent-free tracking. CMP + Consent Mode v2 before any session
   recording or identity pixel; no identity-resolution (Customers.ai-style)
   in phase 1 at all; never on health-adjacent verticals. No client-side
   admin auth anywhere.

## The funnel (all pieces exist or are one step away)

```
cold email (3-touch, outreach-kit.md)
  → pitch.html ("3-minute pitch" link)            [live]
  → personalized Visibility Snapshot (phase 2)    [manual for hot leads now]
  → Calendly booking                              [live]
  → Supabase leads (route=fullshowroom)           [live]
  → close → onboard                               [Henos]
```

Phase-2 lead magnet: auto-generated per-prospect snapshot ("here's who ranks
for 'tint shop {city}' — and where you don't") from DataForSEO SERP data.
Until then: hand-build snapshots for the top 10 prospects only — highest-value
personalization where it counts.

## $3,000 allocation (teardown cost table + market rates)

| Line | Cost | Notes |
|---|---|---|
| 15 sending domains | $150/yr | Neutral-adjacent names; NEVER the brand domains |
| 30 inboxes × 3 months | ~$650 | 2 per domain; Google Workspace or Maildoso-class |
| Sending platform (Instantly/Smartlead) | ~$300 (3 mo) | Warmup included |
| 30–50K sourced + verified contacts | ~$700 | Maps/business emails first; owner enrichment only for repliers |
| Domain replacements + misc | $200 | Burn rate assumption: 2–3 domains/quarter |
| Reserve | ~$1,000 | Deployed only after week-6 read |
| **Total** | **≈$2,000 + reserve** | GHL, identity layer, paid ads: all deferred |

Capacity at steady state: 30 inboxes × 20–25/day × 22 days ≈ **15–18K sends/mo**.

## Warmup & ramp calendar

- **Week 1–2:** domains registered, SPF/DKIM/DMARC on every domain, inboxes
  created, warmup running. ZERO cold sends. (Build lists + snapshots now.)
- **Week 3:** ramp 5–10 cold sends/inbox/day (~2–4K total).
- **Week 4+:** 20–25/inbox/day cap — the boring discipline the 0.5% depends on.
- Send windows Tue–Thu 8–11am prospect-local; plain text; one link; postal
  address + working opt-out on every send (CAN-SPAM floor).

## The measurement layer they skipped (our unfair advantage)

The teardown's core finding: six trackers, ZERO conversion events — their
pixel can't optimize and they can't attribute a booked call to a channel.
Wiring this is nearly free and it's what unlocks paid channels later.

Event schema (adapted from the teardown; live in our pages as dataLayer
pushes now, GTM/GA4/Meta attach later when properties exist):

| dataLayer event | Fires when | GA4 | Meta |
|---|---|---|---|
| audit_started | audit form first focused | audit_started | InitiateCheckout |
| generate_lead | audit form submitted | generate_lead (key event) | Lead |
| call_booked | Calendly confirms (postMessage) | call_booked (key event) | Schedule |
| call_held | CRM marks show — server-side | call_held | CAPI Schedule |
| contract_signed | closed-won — server-side | purchase | CAPI Purchase |
| phone_click | any tel: tap | phone_click | Contact |

Rules from the teardown: events fire from our own page code (already true —
our forms are native, not cross-origin iframes, which is exactly the mistake
that blinded RareCurve); every event carries value; call_held and
contract_signed close the loop to revenue.

## Targets, math, and kill rules

At 15K sends/mo and the 0.5% positive-reply assumption:
**75 conversations → ~15 booked calls (20%) → ~5 closes (33%) → +$5K MRR/mo.**
Quarterly: ~12–15 clients on ~$2,400 spend → CAC ≈ $160–200.

Break-even sanity (their lesson): even ONE Engine client/quarter covers the
entire infra spend. Everything past client #1 is margin.

Kill/adjust rules — read weekly:
- Inbox bounce rate >3% → pause that domain immediately, swap in a spare.
- Positive reply rate <0.2% after 5K sends of a sequence → rewrite the
  sequence (angle, not adjectives) before spending further.
- Reply-to-booked <10% → the pitch link or reply handling is the leak, not
  the list.
- A domain flagged/spam-foldered twice → retire it; never point it at the
  brand sites.
- Renewal < 60% at month 4 → stop scaling acquisition, fix delivery. (Their
  fatal flaw: scaling sales against a leaky bucket, patched with contracts.)

## 30-day launch sequence

| Week | Me (Claude) | Henos |
|---|---|---|
| 1 | Final niche lists (tint done; next metro pulls on request); hand-built visibility snapshots for top 10 prospects; verify contact emails | Buy domains + inboxes, start warmup; register fullshowroom.com; Calendly event type |
| 2 | Load sequences into sending platform format; per-prospect merge fields from CSVs; GTM container plan | Workspace/DNS records (SPF/DKIM/DMARC); pick Instantly vs Smartlead |
| 3 | Monitor copy performance format (reply-tagging sheet); draft reply templates for the 6 common responses | First ramped sends; answer replies same-hour; book calls |
| 4 | Week-4 read: per-sequence stats vs kill rules; iterate copy; scale list | Hold calls, close founding clients, deliver Builds |

## Open per earlier questions (defaults applied until answered)

Niche #1 for volume = tint/PPF nationally + childcare as the scale niche
(only vertical that absorbs 50K+ sends); photography drops to WA-only upsell
at distance; pricing stays as pitch.html; replies handled by Henos with
templates. Say the word to change any of these.
