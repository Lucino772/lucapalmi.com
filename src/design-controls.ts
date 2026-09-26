import type { DesignControl } from "@/components/design-panel/controls";

/**
 * Design variables exposed in the development-only design panel.
 * Defaults must match the values the CSS uses when no override is set.
 */
export const designControls: DesignControl[] = [
    {
        type: "choice",
        key: "writing-align",
        label: "List alignment",
        group: "Writing list",
        attribute: "data-writing-align",
        options: [
            { value: "center", label: "Centred" },
            { value: "left", label: "Left" },
        ],
        default: "center",
    },
    {
        type: "range",
        key: "writing-thumb-width",
        label: "Thumbnail width",
        group: "Writing list",
        property: "--writing-thumb-width",
        min: 96,
        max: 280,
        step: 8,
        unit: "px",
        default: 176,
    },
    {
        type: "range",
        key: "writing-title-size",
        label: "Title size",
        group: "Writing list",
        property: "--writing-title-size",
        min: 14,
        max: 30,
        step: 0.5,
        unit: "px",
        default: 18,
    },
    {
        type: "range",
        key: "writing-entry-gap",
        label: "Space between entries",
        group: "Writing list",
        property: "--writing-entry-gap",
        min: 0,
        max: 64,
        step: 2,
        unit: "px",
        default: 16,
    },
];
