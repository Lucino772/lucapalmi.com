export const calloutTypes = ["note", "tip", "warning"] as const;

export type CalloutType = (typeof calloutTypes)[number];

export const calloutLabels: Record<CalloutType, string> = {
    note: "Note",
    tip: "Tip",
    warning: "Warning",
};
