/* ============================================================
   app-shell.js — injects the shared bar at the top of every
   tool page: a Back button to the hub, the tool's identity, and
   a "Switch tool" menu so you are never stuck inside one app.

   Drop this into a tool's <head> (see docs/adding-a-tool.md):

     <link rel="stylesheet" href="assets/app-shell.css">
     <script src="assets/tools.js" defer></script>
     <script src="assets/app-shell.js" defer></script>

   Options, set as data-attributes on this script tag:
     data-theme="auto|light|dark"   default "auto"
     data-home="index.html"         default "index.html"

   The tool is identified by matching the page's filename against
   `file` in assets/tools.js. An unregistered page still gets a
   working bar, titled from document.title.
   ============================================================ */
(function () {
  "use strict";

  var script = document.currentScript;
  var theme = (script && script.dataset.theme) || "auto";
  var home = (script && script.dataset.home) || "index.html";
  var tools = window.EDITING_APPS || [];

  var here = decodeURIComponent(location.pathname.split("/").pop() || "").toLowerCase();
  var current = null;
  for (var i = 0; i < tools.length; i++) {
    if (tools[i].file.split("/").pop().toLowerCase() === here) { current = tools[i]; break; }
  }

  var ICON_BACK =
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.9" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M9.5 3.5 5 8l4.5 4.5"/></svg>';
  var ICON_CHEVRON =
    '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
    '<path d="M3.5 5.5 8 10l4.5-4.5"/></svg>';

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function markFor(tool) {
    var m = el("span", "appshell-mark", tool ? tool.mark : "\u2022");
    m.setAttribute("aria-hidden", "true");
    if (tool && tool.accent) m.style.setProperty("--as-accent", tool.accent);
    return m;
  }

  function build() {
    var bar = el("div", "appshell");
    bar.setAttribute("data-theme", theme);
    if (current && current.accent) bar.style.setProperty("--as-accent", current.accent);

    var inner = el("div", "appshell-inner");

    // Back to the hub.
    var back = el("a", "appshell-back");
    back.href = home;
    back.innerHTML = ICON_BACK;
    back.appendChild(document.createTextNode("All Tools"));
    back.title = "Back to the tool list";
    inner.appendChild(back);

    inner.appendChild(el("span", "appshell-sep"));
    if (current) inner.appendChild(markFor(current));
    inner.appendChild(el("span", "appshell-title", current ? current.name : document.title));

    // Switch directly to a sibling tool.
    var others = tools.length > 1 ? tools : [];
    if (others.length) inner.appendChild(buildSwitcher(others));

    bar.appendChild(inner);
    document.body.insertBefore(bar, document.body.firstChild);
  }

  function buildSwitcher(list) {
    var wrap = el("div", "appshell-switch");

    var btn = el("button", "appshell-switch-btn");
    btn.type = "button";
    btn.setAttribute("aria-haspopup", "true");
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-label", "Switch tool");
    btn.title = "Open another tool";
    btn.appendChild(el("span", null, "Switch tool"));
    btn.insertAdjacentHTML("beforeend", ICON_CHEVRON);

    var menu = el("div", "appshell-menu");
    menu.hidden = true;
    menu.appendChild(el("div", "appshell-menu-label", "Open another tool"));

    list.forEach(function (tool) {
      var a = el("a");
      a.href = tool.file;
      a.appendChild(markFor(tool));
      a.appendChild(el("span", null, tool.name));
      if (current && tool.id === current.id) a.setAttribute("aria-current", "page");
      menu.appendChild(a);
    });

    function setOpen(open) {
      menu.hidden = !open;
      btn.setAttribute("aria-expanded", String(open));
    }

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      setOpen(menu.hidden);
    });
    document.addEventListener("click", function (e) {
      if (!menu.hidden && !wrap.contains(e.target)) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !menu.hidden) { setOpen(false); btn.focus(); }
    });

    wrap.appendChild(btn);
    wrap.appendChild(menu);
    return wrap;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", build);
  } else {
    build();
  }
})();
