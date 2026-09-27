import type { DesignControl } from "@/components/design-panel/controls";

/**
 * Design variables exposed in the development-only design panel.
 * Defaults must match the values the CSS uses when no override is set.
 * Every V1 decision is locked for now, so the panel is not rendered; add a
 * control here to bring it back.
 */
export const designControls: DesignControl[] = [];
