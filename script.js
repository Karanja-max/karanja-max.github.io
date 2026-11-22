// Karanja Ng'ang'a portfolio: switches between the home page and the case studies, and powers the copy-email button.
/* Show the home view or a case study, based on the URL hash. Other hashes are in-page anchors on the home view. */
(function () {
  var views = document.querySelectorAll('.view');
  var names = {};
  Array.prototype.forEach.call(views, function (v) { names[v.getAttribute('data-view')] = true; });
  function route(first) {
    var h = '';
    try { h = decodeURIComponent(location.hash.slice(1)); } catch (e) {}
    var target = (h && h !== 'home' && names[h]) ? h : 'home';
    Array.prototype.forEach.call(views, function (v) { v.hidden = v.getAttribute('data-view') !== target; });
    if (target !== 'home') { window.scrollTo(0, 0); return; }
    var anchor = h ? document.getElementById(h) : null;
    if (anchor) { anchor.scrollIntoView(); } else if (!first) { window.scrollTo(0, 0); }
  }
  window.addEventListener('hashchange', function () { route(false); });
  route(true);
})();
(function () {
  var btn = document.getElementById('copyBtn');
  var email = document.getElementById('email');
  if (!btn || !email) return;
  function selectText() {
    try {
      var r = document.createRange();
      r.selectNodeContents(email);
      var s = window.getSelection();
      s.removeAllRanges();
      s.addRange(r);
    } catch (e) {}
  }
  btn.addEventListener('click', function () {
    var text = email.textContent.trim();
    function done(ok) {
      btn.textContent = ok ? 'Copied' : 'Press Ctrl/Cmd+C';
      if (!ok) selectText();
      setTimeout(function () { btn.textContent = 'Copy'; }, 2000);
    }
    try {
      navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(false); });
    } catch (e) { done(false); }
  });
})();