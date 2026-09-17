/*
  Full Census tracked links

    fullcensus.org/k7q2mx      the link you send (/404.html catches it)
    fullcensus.org/v/?k7q2mx   the first form; links already sent keep working
    fullcensus.org/v/?me       mark this device as yours; your opens never notify
    fullcensus.org/v/?notme    undo that

  Records the open, then sends the visitor on to the real page. The open is
  recorded from JavaScript on purpose: email security scanners (Outlook Safe
  Links, Gmail, Proofpoint, Mimecast) fetch every link seconds after delivery,
  but they fetch the HTML and do not run it, so they never reach the logger.
  A plain server redirect would ping on nearly every email sent.

  Codes, destinations and recipients live in Supabase (fc_links). This script
  can only resolve a code to its destination; it cannot list links or read names.

  Cloudflare caches .js for 4 hours: bump ?v= in /404.html and /v/index.html
  whenever this file changes.
*/
window.fcLink = (function () {
  var SB = "https://kficcgswkkprnyvuxqsx.supabase.co";
  var KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtmaWNjZ3N3a2twcm55dnV4cXN4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA5NjU0MjUsImV4cCI6MjA5NjU0MTQyNX0.uMHqNV4IAWv1WVJTmouqG-Oju5d-hK5sC7RmYEdqRDM";
  var HOME = "https://fullcensus.org/websites/";

  function isMine() { try { return localStorage.getItem("fc_me") === "1"; } catch (e) { return false; } }
  function markMine(on) {
    try { if (on) localStorage.setItem("fc_me", "1"); else localStorage.removeItem("fc_me"); } catch (e) {}
  }

  // Record an open of `code`, then leave for its destination. `unknown` runs
  // when no such link exists; by default the visitor goes to my work instead.
  function open(code, unknown) {
    var left = false;
    function go(url) { if (left) return; left = true; location.replace(url); }
    code = String(code || "").toLowerCase();
    unknown = unknown || function () { go(HOME); };
    if (!/^[a-z0-9]{4,12}$/.test(code)) { unknown(); return; }

    var ua = navigator.userAgent || "";
    // Scanners that DO run JavaScript usually announce themselves one of these ways.
    var bot = !!navigator.webdriver ||
      /bot|crawl|spider|slurp|preview|scanner|headless|phantom|lighthouse|facebookexternalhit|embedly|pinterest|slack|discord|whatsapp|telegram|skype|bingpreview|google-safety|safelinks|proofpoint|mimecast|barracuda/i.test(ua);

    // Never strand someone on a blank page if the network is slow.
    var fallback = setTimeout(function () { go(HOME); }, 4000);

    fetch(SB + "/rest/v1/rpc/fc_track_click", {
      method: "POST",
      keepalive: true,
      headers: { "apikey": KEY, "Authorization": "Bearer " + KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ p_code: code, p_ua: ua, p_ref: document.referrer || "", p_self: isMine(), p_bot: bot })
    })
      .then(function (r) { if (!r.ok) throw new Error("tracker " + r.status); return r.json(); })
      .then(function (dest) {
        clearTimeout(fallback);
        if (left) return;
        // The exact address you chose, nothing added: no ?utm_ tail in her address bar.
        if (typeof dest === "string" && /^https:\/\//i.test(dest)) go(dest);
        else unknown();
      })
      // If the tracker itself is down, still show them the work, never an error.
      .catch(function () { clearTimeout(fallback); go(HOME); });
  }

  return { open: open, isMine: isMine, markMine: markMine, HOME: HOME };
})();
