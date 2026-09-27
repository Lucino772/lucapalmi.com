import type { DesignControl } from "@/components/design-panel/controls";

/**
 * Design variables exposed in the development-only design panel.
 * Defaults must match the values the CSS uses when no override is set.
 */
export const designControls: DesignControl[] = [
    // V1 Workstation
    {
        type: "range",
        key: "home-headline-rem",
        label: "Headline size (rem)",
        group: "Home",
        property: "--home-headline-size",
        min: 1.75,
        max: 3.5,
        step: 0.0625,
        unit: "rem",
        default: 2.125,
    },
    {
        type: "range",
        key: "home-drawing-size",
        label: "Drawing size (%)",
        group: "Home",
        property: "--home-drawing-size",
        min: 50,
        max: 110,
        step: 5,
        unit: "",
        default: 100,
    },
    {
        type: "choice",
        key: "portrait-animation",
        label: "Drawing animation",
        group: "Home",
        attribute: "data-portrait-animation",
        options: [
            { value: "on", label: "Draw in" },
            { value: "off", label: "Static" },
        ],
        default: "on",
    },
    {
        type: "range",
        key: "screen-glow",
        label: "Laptop screen glow (%)",
        group: "Glow",
        property: "--screen-glow",
        min: 0,
        max: 300,
        step: 10,
        unit: "",
        default: 100,
    },
];
