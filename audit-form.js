/* Full Census — shared Occupancy Audit CTA (a copy of the homepage #audit block).
   Put <div data-audit-form></div> where the CTA should appear, then load this file
   with <script src="audit-form.js"></script> (adjust the path per page).
   Renders the dark pitch + booking form, saves the lead to Supabase (best effort),
   then swaps the form for the Calendly scheduler — so the follow-up always shows
   and the lead is captured even if they never finish booking. */
(function () {
  var mounts = document.querySelectorAll('[data-audit-form]');
  if (!mounts.length) return;

  var SUPABASE_URL  = "https://kficcgswkkprnyvuxqsx.supabase.co";
  var SUPABASE_ANON = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmaWNjZ3N3a2twcm55dnV4cXN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5NjU0MjUsImV4cCI6MjA5NjU0MTQyNX0.uMHqNV4IAWv1WVJTmouqG-Oju5d-hK5sC7RmYEdqRDM";
  var CAL = "https://calendly.com/henosadhana/free-occupancy-audit";

  // Asset base derived from this script's own URL, so the headshot resolves from any folder depth.
  var me = document.currentScript;
  if (!me) { var ss = document.querySelectorAll('script[src]'); for (var i = ss.length - 1; i >= 0; i--) { if (ss[i].src.indexOf('audit-form.js') > -1) { me = ss[i]; break; } } }
  var BASE = me ? me.src.replace(/[^/]*$/, '') : '';
  var HEADSHOT = BASE + 'assets/henos-adhana.jpg';

  var css = ""
    + ".fccta{background:#000;color:#fff;border-radius:28px;padding:46px 0;overflow:hidden}"
    // The guides set their article column to 760px for readability, which squeezed
    // this form to 720px and left the two columns at ~310px each. Let it break out
    // of that column and use the width it was designed for. Scoped to main.narrow so
    // pages that already give it full width (/websites) are untouched. Fixed pixel
    // steps rather than vw, so a scrollbar can never push the page sideways.
    + "@media(min-width:1060px){main.narrow [data-audit-form]{margin-left:-120px;margin-right:-120px}}"
    + "@media(min-width:1260px){main.narrow [data-audit-form]{margin-left:-230px;margin-right:-230px}}"
    + ".fccta .fcw{max-width:1100px;margin:0 auto;padding:0 22px}"
    + ".fccta .fcg{display:grid;grid-template-columns:1fr 1.05fr;gap:40px;align-items:start}"
    + ".fccta .qp .eyebrow{color:#c4b139;font-size:.78rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;margin-bottom:14px}"
    + ".fccta .qp h2{font-size:clamp(1.9rem,3.4vw,2.9rem);font-weight:700;color:#fff;line-height:1.18;letter-spacing:-.01em;margin-bottom:16px;text-wrap:balance}"
    + ".fccta .qp h2 .hl{background:#c4b139;color:#000;padding:.02em .16em;border-radius:8px;-webkit-box-decoration-break:clone;box-decoration-break:clone}"
    + ".fccta .qp .lead{color:#cfcfcf;margin-bottom:16px;font-size:1.02rem}"
    + ".fccta .qp ul{list-style:none;margin:18px 0;padding:0}"
    + ".fccta .qp li{display:flex;gap:10px;align-items:flex-start;margin-bottom:10px;color:#ededed;font-size:.97rem}"
    + ".fccta .qp li svg{width:18px;height:18px;flex:0 0 auto;margin-top:3px}"
    + ".fccta .qp li em{font-style:italic;color:#c4b139}"
    + ".fccta .peer{display:flex;gap:14px;align-items:center;margin-top:22px;padding:16px 18px;background:rgba(255,255,255,.08);border-radius:22px}"
    + ".fccta .peer .av{position:relative;flex:none;width:46px;height:46px;border-radius:50%;background:#c4b139;color:#000;display:flex;align-items:center;justify-content:center;font-weight:700;overflow:hidden}"
    + ".fccta .peer .av i{font-style:normal}"
    + ".fccta .peer .av img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 18%}"
    + ".fccta .peer .pt{color:#cfcfcf;font-size:.9rem}"
    + ".fccta .peer .pt b{color:#fff}"
    + ".fccta .peer .pt a{color:#c4b139;font-weight:700}"
    + ".fccta .peer .pt small{color:#a8a8a8}"
    + ".fcaf{background:#fff;color:#141414;border-radius:24px;padding:26px;box-shadow:0 18px 50px rgba(0,0,0,.28);width:100%;text-align:left;font-family:inherit}"
    + ".fcaf h3{font-size:1.3rem;font-weight:700;margin:0 0 4px;color:#000}"
    + ".fcaf .fcaf-sub{color:#6f6f6f;font-size:.9rem;margin:0 0 18px}"
    + ".fcaf .fcaf-field{display:block;margin-bottom:13px}"
    + ".fcaf .fcaf-field span{display:block;font-size:.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:#000;margin-bottom:6px}"
    + ".fcaf .fcaf-field span em{font-style:normal;color:#9a9a9a;font-weight:500}"
    + ".fcaf .fcaf-field input,.fcaf .fcaf-field select{width:100%;padding:.8rem .9rem;border:1.5px solid #d8d8d8;border-radius:14px;font-family:inherit;font-size:.95rem;background:#f4f4f4;color:#141414}"
    + ".fcaf .fcaf-field input:focus,.fcaf .fcaf-field select:focus{outline:none;border-color:#000;background:#fff}"
    + ".fcaf .fcaf-row2{display:grid;grid-template-columns:1fr 1fr;gap:12px}"
    + ".fcaf button{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;margin-top:10px;padding:1rem;font-family:inherit;font-weight:700;font-size:.98rem;border:0;border-radius:40px;background:#000;color:#fff;cursor:pointer}"
    + ".fcaf button svg{width:15px;height:15px}"
    + ".fcaf button:disabled{opacity:.65;cursor:default}"
    + ".fcaf .fcaf-note{text-align:center;font-size:.78rem;color:#6f6f6f;margin-top:14px}"
    + ".fcaf .fcaf-note a{color:#000;font-weight:700}"
    + ".fcaf-done{background:#fff;border-radius:24px;padding:24px;box-shadow:0 18px 50px rgba(0,0,0,.28);width:100%;text-align:center}"
    + ".fcaf-done h3{font-size:1.25rem;font-weight:800;color:#141414;margin:0 0 4px}"
    + ".fcaf-done p{color:#6f6f6f;font-size:.9rem;margin:0 0 10px}"
    + ".fcaf-done iframe{width:100%;min-height:600px;border:0;border-radius:14px;background:#fff}"
    + ".fcaf-done .fcaf-fallback{font-size:.8rem;margin:8px 0 0}"
    + ".fcaf-done .fcaf-fallback a{color:#141414;font-weight:700;text-decoration:underline}"
    + "@media(max-width:820px){.fccta .fcg{grid-template-columns:1fr;gap:28px}}";
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  var CHECK = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 13l4 4L19 7" stroke="#c4b139" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>';


  // ---- analytics ------------------------------------------------------------
  // Fires to GA4 (gtag), GTM (dataLayer) and Clarity. Wrapped so a blocked
  // analytics script can never stop a lead from being saved.
  function track(name, params) {
    params = params || {};
    try { if (window.gtag) window.gtag('event', name, params); } catch (e) {}
    try { (window.dataLayer = window.dataLayer || []).push(Object.assign({ event: name }, params)); } catch (e) {}
    try { if (window.clarity) window.clarity('event', name); } catch (e) {}
  }

  function esc(t){ return String(t==null?'':t).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];}); }

  // Per-page copy. Set any of these on the [data-audit-form] div:
  //   data-eyebrow  data-heading  data-lead  data-b1 data-b2 data-b3
  //   data-cta (button + form title)  data-sub  data-nophone="1"
  // Omit an attribute and the original default is used, so existing pages are unchanged.
  function PITCH(m) {
    var eyebrow = m.getAttribute('data-eyebrow') || 'Free Occupancy Audit';
    var heading = m.getAttribute('data-heading') || 'See exactly why your beds are <span class="hl">empty.</span>';
    var lead    = m.getAttribute('data-lead')    || "A free 30-minute call. We'll look at your home's current online presence and your local market, then show you the path to full. No pressure, no jargon.";
    var b1 = m.getAttribute('data-b1') || "Where families can (and can't) find you today";
    var b2 = m.getAttribute('data-b2') || "What your competitors are doing to rank";
    var b3 = m.getAttribute('data-b3') || "The fastest path to booked tours for <em>your</em> beds";
    return '<div class="qp">'
      + '<p class="eyebrow">' + esc(eyebrow) + '</p>'
      + '<h2>' + heading + '</h2>'
      + '<p class="lead">' + esc(lead) + '</p>'
      + '<ul>'
      +   '<li>' + CHECK + b1 + '</li>'
      +   '<li>' + CHECK + b2 + '</li>'
      +   '<li>' + CHECK + b3 + '</li>'
      + '</ul>'
      + '<div class="peer">'
      +   '<a class="av" href="' + BASE + 'about.html" aria-label="About Henos Adhana"><i>HA</i><img src="' + HEADSHOT + '" alt="Henos Adhana, founder of Full Census" onerror="this.style.display=\'none\'"></a>'
      +   '<div class="pt"><b>Henos Adhana.</b> My family runs <a href="https://lynnwoodafh.com" target="_blank" rel="noopener">Serene Lynnwood</a> AFH.<br><small>I built Full Census to do for your home what I did for ours.</small></div>'
      + '</div>'
      + '</div>';
  }

  function FORM(m) {
    var cta = m.getAttribute('data-cta') || 'Book my free audit';
    var sub = m.getAttribute('data-sub') || "We'll reach out within one business day to schedule.";
    var phoneLine = m.getAttribute('data-nophone') ? ''
      : '<div class="fcaf-note">Or call/text <a href="tel:+12062034944">(206) 203-4944</a></div>';
    return '<form class="fcaf" aria-label="' + esc(cta) + '">'
      + '<h3>' + esc(cta) + '</h3>'
      + '<div class="fcaf-sub">' + esc(sub) + '</div>'
      + '<label class="fcaf-field"><span>Your name</span><input name="afname" type="text" required placeholder="First and last"></label>'
      + '<label class="fcaf-field"><span>Adult family home name</span><input name="afhome" type="text" required placeholder="e.g. Serene Adult Family Home"></label>'
      + '<div class="fcaf-row2">'
      +   '<label class="fcaf-field"><span>City</span><input name="afcity" type="text" required placeholder="Lynnwood"></label>'
      +   '<label class="fcaf-field"><span>Open beds</span><input name="afbeds" type="number" min="0" placeholder="e.g. 3"></label>'
      + '</div>'
      + '<div class="fcaf-row2">'
      +   '<label class="fcaf-field"><span>Phone <em>(optional)</em></span><input name="afphone" type="tel" placeholder="(425) 555-0142"></label>'
      +   '<label class="fcaf-field"><span>Have a website?</span><select name="afweb"><option value="">Select&hellip;</option><option value="no">No website</option><option value="yes">Yes, we have one</option><option value="unsure">Not sure</option></select></label>'
      + '</div>'
      + '<label class="fcaf-field"><span>Email</span><input name="afemail" type="email" required placeholder="you@email.com"></label>'
      + '<button type="submit">' + esc(cta) + ' <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>'
      + phoneLine
      + '</form>';
  }

  function done(q, nophone) {
    return '<div class="fcaf-done">'
      + '<h3>Thank you. Your details are saved.</h3>'
      + '<p>Now pick a time below and we will talk.</p>'
      + '<iframe src="' + CAL + q + '" title="Schedule your free Occupancy Audit" loading="lazy"></iframe>'
      + '<p class="fcaf-fallback">Cannot see the calendar? <a href="' + CAL + q + '" target="_blank" rel="noopener">Open it in a new tab</a> ' + (nophone ? '.' : ' or call (206) 203-4944.') + '</p>'
      + '</div>';
  }

  mounts.forEach(function (mount) {
    mount.innerHTML = '<div class="fccta"><div class="fcw"><div class="fcg">' + PITCH(mount) + '<div class="fc-formcol">' + FORM(mount) + '</div></div></div></div>';
    var formcol = mount.querySelector('.fc-formcol');
    var form = formcol.querySelector('form');
    var started = false;
    form.addEventListener('input', function () {
      if (started) return; started = true;
      track('form_start', { form_id: 'occupancy_audit', page_path: location.pathname });
    }, { once: false });
    var btn = form.querySelector('button');
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      var get = function (n) { var el = form.querySelector('[name=' + n + ']'); return el ? el.value.trim() : ""; };
      var name = get('afname'), home = get('afhome'), city = get('afcity'), beds = get('afbeds'), phone = get('afphone'), website = get('afweb'), email = get('afemail');
      btn.disabled = true; btn.textContent = "Sending…";
      var payload = {
        family_name: name, email: email, phone: phone || "", location_pref: city,
        notes: "Occupancy Audit request · Home: " + home + (beds ? " · Open beds: " + beds : "") + (website ? " · Website: " + website : "") + " · via " + (document.title || "site"),
        source: "occupancy-audit", route: "fullcensus", status: "new"
      };
      try {
        await fetch(SUPABASE_URL + "/rest/v1/leads", {
          method: "POST",
          headers: { "apikey": SUPABASE_ANON, "Authorization": "Bearer " + SUPABASE_ANON, "Content-Type": "application/json", "Prefer": "return=minimal" },
          body: JSON.stringify(payload)
        });
      } catch (err) { /* network hiccup — still send them to scheduling */ }
      // Email a copy of the lead to the operator (Formsubmit — free, no server needed).
      try {
        await fetch("https://formsubmit.co/ajax/henosadhana@gmail.com", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          body: JSON.stringify({
            _subject: "New Occupancy Audit request — " + (home || "an AFH"),
            _template: "table", _captcha: "false",
            Name: name, "Adult family home": home, City: city,
            "Open beds": beds || "—", Phone: phone,
            "Has website": website || "—", Email: email,
            Source: (document.title || "fullcensus.org")
          })
        });
      } catch (err) { /* email is best-effort; the lead is already saved above */ }
      // GA4's recommended lead event, so this shows up as a conversion.
      track('generate_lead', {
        form_id: 'occupancy_audit',
        page_path: location.pathname,
        page_title: document.title,
        home_city: city,
        has_website: website || 'unknown',
        gave_phone: phone ? 'yes' : 'no',
        currency: 'USD', value: 1
      });
      var q = "?hide_gdpr_banner=1" + (name ? "&name=" + encodeURIComponent(name) : "") + (email ? "&email=" + encodeURIComponent(email) : "");
      formcol.innerHTML = done(q, mount.getAttribute('data-nophone'));
    });
  });
  // Any CTA that points at the form (nav button, mid-article link, etc).
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest && e.target.closest('a[href*="#build"]');
    if (!a) return;
    track('cta_click', {
      cta_text: (a.textContent || '').trim().slice(0, 60),
      cta_location: a.closest('.midcta') ? 'mid_article' : (a.closest('header') ? 'nav' : 'other'),
      page_path: location.pathname
    });
  }, true);
})();
