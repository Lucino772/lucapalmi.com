// The one inline script in <head>, run before first paint so the static
// HTML shows the right theme and scrollbar offset with no flash. A plain
// module (not "use client"): the server layout needs the string itself, and
// a string exported from a client module would arrive as a client reference.

export const THEME_STORAGE_KEY = "theme";

// The page background per theme (--color-bg in globals.css), for
// <meta name="theme-color">
export const themeColors = { light: "#e8e5de", dark: "#272727" } as const;

// Off-screen probe for the classic scrollbar's width
const PROBE =
    "position:absolute;top:-200px;left:0;width:100px;height:100px;overflow:scroll;visibility:hidden";

// 1. Theme: an explicit choice wins, otherwise the OS scheme, which is then
//    followed live while nothing is stored. Sets the .dark class and
//    <meta name="theme-color"> (again once the metas are parsed).
// 2. --scrollbar-width on <html> (0px with overlay scrollbars): pages with
//    the permanent track use it to line up with the track-less home
//    (.scrollbar-offset); 100vw can't provide it, since viewport units
//    exclude the scrollbar when the root has overflow: scroll. The probe goes
//    on <html> because <body> doesn't exist yet. Browser zoom changes the
//    width in CSS px: a resize with a new devicePixelRatio re-measures, at
//    most once per frame.
export const prePaintScript = `(function () {
var root = document.documentElement;
try {
  var colors = ${JSON.stringify(themeColors)};
  var os = matchMedia("(prefers-color-scheme: dark)");
  var stored = function () {
    var t = localStorage.getItem("${THEME_STORAGE_KEY}");
    return t === "light" || t === "dark" ? t : null;
  };
  var apply = function (theme) {
    root.classList.toggle("dark", theme === "dark");
    document.querySelectorAll('meta[name="theme-color"]').forEach(function (m) {
      m.setAttribute("content", colors[theme]);
    });
  };
  var current = function () { return stored() || (os.matches ? "dark" : "light"); };
  apply(current());
  document.addEventListener("DOMContentLoaded", function () { apply(current()); });
  os.addEventListener("change", function () { if (!stored()) apply(current()); });
} catch (e) {}
try {
  var measure = function () {
    var probe = document.createElement("div");
    probe.style.cssText = ${JSON.stringify(PROBE)};
    root.appendChild(probe);
    var width = probe.offsetWidth - probe.clientWidth;
    root.removeChild(probe);
    root.style.setProperty("--scrollbar-width", width + "px");
  };
  measure();
  var ratio = devicePixelRatio, frame = 0;
  addEventListener("resize", function () {
    if (frame) return;
    frame = requestAnimationFrame(function () {
      frame = 0;
      if (devicePixelRatio === ratio) return;
      ratio = devicePixelRatio;
      measure();
    });
  });
} catch (e) {}
})();`;
