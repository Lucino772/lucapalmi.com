// The classic scrollbar's width, as --scrollbar-width on <html> (0px with
// overlay scrollbars). Pages with the permanent track use it to line their
// content up with the track-less home (see .scrollbar-offset). 100vw can't
// provide it: with overflow-y: scroll on the root, viewport units already
// exclude the scrollbar. Measured on a throwaway off-screen box appended to
// <html>, because <body> doesn't exist yet when the pre-paint script runs.
// Plain module (not "use client") so the server layout gets the string.

const PROBE =
    "position:absolute;top:-200px;left:0;width:100px;height:100px;overflow:scroll;visibility:hidden";

export function measureScrollbarWidth() {
    const root = document.documentElement;
    const probe = document.createElement("div");
    probe.style.cssText = PROBE;
    root.appendChild(probe);
    const width = probe.offsetWidth - probe.clientWidth;
    root.removeChild(probe);
    root.style.setProperty("--scrollbar-width", `${width}px`);
}

// Same measurement, inlined in <head> so it runs before first paint
export const scrollbarWidthScript = `(function(){try{var r=document.documentElement,p=document.createElement("div");p.style.cssText=${JSON.stringify(PROBE)};r.appendChild(p);var w=p.offsetWidth-p.clientWidth;r.removeChild(p);r.style.setProperty("--scrollbar-width",w+"px")}catch(e){}})()`;
