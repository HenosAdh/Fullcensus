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
    + ".fccta .fcw{max-width:1100px;margin:0 auto;padding:0 22px}"
    + ".fccta .fcg{display:grid;grid-template-columns:1fr 1.05fr;gap:40px;align-items:start}"
    + ".fccta .qp .eyebrow{color:#c4b139;font-size:.78rem;font-weight:600;letter-spacing:.14em;text-transform:uppercase;margin-bottom:14px}"
    + ".fccta .qp h2{font-size:clamp(1.9rem,3.4vw,2.9rem);font-weight:700;color:#fff;line-height:1.04;letter-spacing:-.01em;margin-bottom:16px}"
    + ".fccta .qp h2 .hl{background:#c4b139;color:#000;padding:0 .14em;border-radius:8px}"
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

  var PITCH = '<div class="qp">'
    + '<p class="eyebrow">Free Occupancy Audit</p>'
    + '<h2>See exactly why your beds are <span class="hl">empty.</span></h2>'
    + '<p class="lead">A free 30-minute call. We\'ll look at your home\'s current online presence and your local market, then show you the path to full. No pressure, no jargon.</p>'
    + '<ul>'
    +   '<li>' + CHECK + 'Where families can (and can\'t) find you today</li>'
    +   '<li>' + CHECK + 'What your competitors are doing to rank</li>'
    +   '<li>' + CHECK + 'The fastest path to booked tours for <em>your</em> beds</li>'
    + '</ul>'
    + '<div class="peer">'
    +   '<a class="av" href="' + BASE + 'about.html" aria-label="About Henos Adhana"><i>HA</i><img src="' + HEADSHOT + '" alt="Henos Adhana, founder of Full Census" onerror="this.style.display=\'none\'"></a>'
    +   '<div class="pt"><b>Henos Adhana.</b> My family runs <a href="https://lynnwoodafh.com" target="_blank" rel="noopener">Serene Lynnwood</a> AFH.<br><small>I built Full Census to do for your home what I did for ours.</small></div>'
    + '</div>'
    + '</div>';

  var FORM = '<form class="fcaf" aria-label="Book your free Occupancy Audit">'
    + '<h3>Book my free audit</h3>'
    + '<div class="fcaf-sub">We\'ll reach out within one business day to schedule.</div>'
    + '<label class="fcaf-field"><span>Your name</span><input name="afname" type="text" required placeholder="First and last"></label>'
    + '<label class="fcaf-field"><span>Adult family home name</span><input name="afhome" type="text" required placeholder="e.g. Serene Adult Family Home"></label>'
    + '<div class="fcaf-row2">'
    +   '<label class="fcaf-field"><span>City</span><input name="afcity" type="text" required placeholder="Lynnwood"></label>'
    +   '<label class="fcaf-field"><span>Open beds</span><input name="afbeds" type="number" min="0" placeholder="e.g. 3"></label>'
    + '</div>'
    + '<div class="fcaf-row2">'
    +   '<label class="fcaf-field"><span>Phone</span><input name="afphone" type="tel" required placeholder="(425) 555-0142"></label>'
    +   '<label class="fcaf-field"><span>Have a website?</span><select name="afweb"><option value="">Select…</option><option value="no">No website</option><option value="yes">Yes, we have one</option><option value="unsure">Not sure</option></select></label>'
    + '</div>'
    + '<label class="fcaf-field"><span>Email</span><input name="afemail" type="email" required placeholder="you@email.com"></label>'
    + '<button type="submit">Book my free audit <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button>'
    + '<div class="fcaf-note">Or call/text <a href="tel:+14255025648">(425) 502-5648</a></div>'
    + '</form>';

  function done(q) {
    return '<div class="fcaf-done">'
      + '<h3>Thank you. Your details are saved.</h3>'
      + '<p>Now pick a time below and we will talk.</p>'
      + '<iframe src="' + CAL + q + '" title="Schedule your free Occupancy Audit" loading="lazy"></iframe>'
      + '<p class="fcaf-fallback">Cannot see the calendar? <a href="' + CAL + q + '" target="_blank" rel="noopener">Open it in a new tab</a> or call (425) 502-5648.</p>'
      + '</div>';
  }

  mounts.forEach(function (mount) {
    mount.innerHTML = '<div class="fccta"><div class="fcw"><div class="fcg">' + PITCH + '<div class="fc-formcol">' + FORM + '</div></div></div></div>';
    var formcol = mount.querySelector('.fc-formcol');
    var form = formcol.querySelector('form');
    var btn = form.querySelector('button');
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      var get = function (n) { var el = form.querySelector('[name=' + n + ']'); return el ? el.value.trim() : ""; };
      var name = get('afname'), home = get('afhome'), city = get('afcity'), beds = get('afbeds'), phone = get('afphone'), website = get('afweb'), email = get('afemail');
      btn.disabled = true; btn.textContent = "Booking…";
      var payload = {
        family_name: name, email: email, phone: phone, location_pref: city,
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
      var q = "?hide_gdpr_banner=1" + (name ? "&name=" + encodeURIComponent(name) : "") + (email ? "&email=" + encodeURIComponent(email) : "");
      formcol.innerHTML = done(q);
    });
  });
})();
