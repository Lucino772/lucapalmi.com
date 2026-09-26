/**
 * Declarative description of the design variables exposed in the
 * development-only design panel. Each control drives either a CSS custom
 * property or a data attribute on <html>, so designs react through CSS only.
 *
 * This module is shared by the server layout (to build the pre-paint script)
 * and the client panel, so it must stay free of client-only code.
 */
export type ChoiceControl = {
    type: "choice";
    key: string;
    label: string;
    group?: string;
    /** Data attribute set on <html>, e.g. "data-writing-align" */
    attribute: string;
    options: { value: string; label: string }[];
    default: string;
};

export type RangeControl = {
    type: "range";
    key: string;
    label: string;
    group?: string;
    /** CSS custom property set on <html>, e.g. "--writing-thumb-width" */
    property: string;
    min: number;
    max: number;
    step: number;
    unit: string;
    default: number;
};

export type DesignControl = ChoiceControl | RangeControl;

export const STORAGE_PREFIX = "design:";

export const devtoolsEnabled = process.env.NODE_ENV !== "production";

export function formatValue(control: DesignControl, value: string | number) {
    return control.type === "range" ? `${value}${control.unit}` : String(value);
}

/**
 * Pre-paint script applying stored overrides in development. Defaults are
 * expected to live in CSS, so production needs no script at all.
 */
export function designPanelScript(controls: DesignControl[]): string {
    if (!devtoolsEnabled) {
        return "";
    }
    const spec = controls.map((control) =>
        control.type === "choice"
            ? { k: control.key, a: control.attribute }
            : { k: control.key, p: control.property, u: control.unit },
    );
    return `(function(){try{var s=${JSON.stringify(spec)},r=document.documentElement;s.forEach(function(c){var v=localStorage.getItem("${STORAGE_PREFIX}"+c.k);if(v===null)return;if(c.a){r.setAttribute(c.a,v)}else{r.style.setProperty(c.p,v+c.u)}})}catch(e){}})()`;
}
