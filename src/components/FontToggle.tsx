"use client";

import { useEffect, useState } from "react";

const fonts = [
    ["inconsolata", "Inconsolata"],
    ["plex", "IBM Plex Sans"],
    ["inter", "Inter"],
    ["literata", "Literata"],
] as const;

export default function FontToggle() {
    const [font, setFont] = useState(() => {
        if (typeof window === "undefined") return "inconsolata";
        const savedFont = localStorage.getItem("body-font");
        return savedFont && fonts.some(([key]) => key === savedFont)
            ? savedFont
            : "inconsolata";
    });
    useEffect(() => {
        document.documentElement.dataset.bodyFont = font;
    }, [font]);

    function selectFont(key: string) {
        setFont(key);
        localStorage.setItem("body-font", key);
    }

    return (
        <div className="fixed right-4 bottom-4 z-50 rounded-lg bg-[#242424] p-3 text-xs shadow-lg">
            <p className="mb-2 text-gray-400">Body font</p>
            <div className="flex flex-col gap-1">
                {fonts.map(([key, label]) => (
                    <button
                        key={key}
                        type="button"
                        onClick={() => selectFont(key)}
                        className={`rounded px-2 py-1 text-left ${font === key ? "bg-[#4169E1] text-white" : "text-gray-300 hover:bg-white/10"}`}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
}
