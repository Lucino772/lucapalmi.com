import type { DesignControl } from "@/components/design-panel/controls";

/**
 * Design variables exposed in the development-only design panel.
 * Defaults must match the values the CSS uses when no override is set.
 */
export const designControls: DesignControl[] = [
    {
        type: "choice",
        key: "logo-colour",
        label: "Logo colour",
        group: "Header",
        attribute: "data-logo-colour",
        options: [
            { value: "accent", label: "Accent" },
            { value: "text", label: "Text colour" },
        ],
        default: "accent",
    },
];
