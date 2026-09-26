"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { useHomeLayout, type HomeLayout } from "@/components/home-layout";
import {
    STORAGE_PREFIX,
    devtoolsEnabled,
    formatValue,
    type DesignControl,
} from "./controls";

type Values = Record<string, string | number>;

function readValues(controls: DesignControl[]): Values {
    const values: Values = {};
    for (const control of controls) {
        const stored = localStorage.getItem(STORAGE_PREFIX + control.key);
        values[control.key] =
            stored === null
                ? control.default
                : control.type === "range"
                  ? Number(stored)
                  : stored;
    }
    return values;
}

function apply(control: DesignControl, value: string | number | null) {
    const root = document.documentElement;
    if (control.type === "choice") {
        if (value === null) {
            root.removeAttribute(control.attribute);
        } else {
            root.setAttribute(control.attribute, String(value));
        }
    } else if (value === null) {
        root.style.removeProperty(control.property);
    } else {
        root.style.setProperty(control.property, `${value}${control.unit}`);
    }
}

/**
 * Development-only panel to tweak design variables live. Renders nothing in
 * production. Values persist in localStorage; "Copy settings" puts the
 * current values on the clipboard so they can be made the new defaults.
 */
export function DesignPanel({
    controls,
    className,
}: {
    controls: DesignControl[];
    className?: string;
}) {
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState<Values | null>(null);
    const [copied, setCopied] = useState(false);
    const { layout, setLayout } = useHomeLayout();

    useEffect(() => {
        if (!devtoolsEnabled) {
            return;
        }
        const frame = requestAnimationFrame(() => {
            setValues(readValues(controls));
            setOpen(localStorage.getItem(`${STORAGE_PREFIX}open`) === "1");
        });
        return () => cancelAnimationFrame(frame);
    }, [controls]);

    if (!devtoolsEnabled || values === null) {
        return null;
    }

    const toggleOpen = () => {
        localStorage.setItem(`${STORAGE_PREFIX}open`, open ? "0" : "1");
        setOpen(!open);
    };

    const update = (control: DesignControl, value: string | number) => {
        localStorage.setItem(STORAGE_PREFIX + control.key, String(value));
        apply(control, value);
        setValues({ ...values, [control.key]: value });
    };

    const reset = () => {
        for (const control of controls) {
            localStorage.removeItem(STORAGE_PREFIX + control.key);
            apply(control, null);
        }
        setValues(readValues(controls));
    };

    const copy = async () => {
        const lines = [
            `home layout: ${layout}`,
            ...controls.map(
                (control) =>
                    `${control.label}: ${formatValue(control, values[control.key])}` +
                    (values[control.key] === control.default
                        ? " (default)"
                        : ""),
            ),
        ];
        await navigator.clipboard.writeText(lines.join("\n"));
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    const groups = Array.from(
        new Set(controls.map((control) => control.group ?? "Design")),
    );

    return (
        <div
            className={cn(
                "fixed right-4 bottom-4 z-50 flex max-h-[calc(100dvh-2rem)] w-72 flex-col items-end gap-2 text-xs",
                className,
            )}
        >
            {open && (
                <section
                    id="design-panel"
                    aria-label="Design panel (review)"
                    className="design-panel-surface w-full overflow-y-auto rounded-md border p-3 shadow-lg"
                >
                    <fieldset className="mb-3 flex flex-col gap-1">
                        <legend className="mb-1 font-semibold">Home</legend>
                        <div className="flex gap-1">
                            {(["scroll", "fit"] as HomeLayout[]).map(
                                (option) => (
                                    <button
                                        key={option}
                                        type="button"
                                        aria-pressed={layout === option}
                                        onClick={() => setLayout(option)}
                                        className="flex-1 cursor-pointer rounded border px-2 py-1 capitalize aria-pressed:font-semibold"
                                    >
                                        {option}
                                    </button>
                                ),
                            )}
                        </div>
                    </fieldset>
                    {groups.map((group) => (
                        <fieldset
                            key={group}
                            className="mb-3 flex flex-col gap-2"
                        >
                            <legend className="mb-1 font-semibold">
                                {group}
                            </legend>
                            {controls
                                .filter(
                                    (control) =>
                                        (control.group ?? "Design") === group,
                                )
                                .map((control) => (
                                    <div
                                        key={control.key}
                                        className="flex flex-col gap-1"
                                    >
                                        <span className="flex justify-between gap-2">
                                            <label
                                                htmlFor={`design-${control.key}`}
                                            >
                                                {control.label}
                                            </label>
                                            <output
                                                htmlFor={`design-${control.key}`}
                                                className="tabular-nums opacity-70"
                                            >
                                                {formatValue(
                                                    control,
                                                    values[control.key],
                                                )}
                                            </output>
                                        </span>
                                        {control.type === "choice" ? (
                                            <select
                                                id={`design-${control.key}`}
                                                value={String(
                                                    values[control.key],
                                                )}
                                                onChange={(event) =>
                                                    update(
                                                        control,
                                                        event.target.value,
                                                    )
                                                }
                                                className="rounded border bg-transparent px-1 py-0.5"
                                            >
                                                {control.options.map(
                                                    (option) => (
                                                        <option
                                                            key={option.value}
                                                            value={option.value}
                                                        >
                                                            {option.label}
                                                        </option>
                                                    ),
                                                )}
                                            </select>
                                        ) : (
                                            <input
                                                id={`design-${control.key}`}
                                                type="range"
                                                min={control.min}
                                                max={control.max}
                                                step={control.step}
                                                value={Number(
                                                    values[control.key],
                                                )}
                                                onChange={(event) =>
                                                    update(
                                                        control,
                                                        Number(
                                                            event.target.value,
                                                        ),
                                                    )
                                                }
                                            />
                                        )}
                                    </div>
                                ))}
                        </fieldset>
                    ))}
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={reset}
                            className="flex-1 cursor-pointer rounded border px-2 py-1"
                        >
                            Reset
                        </button>
                        <button
                            type="button"
                            onClick={copy}
                            className="flex-1 cursor-pointer rounded border px-2 py-1"
                        >
                            {copied ? "Copied" : "Copy settings"}
                        </button>
                    </div>
                </section>
            )}
            <button
                type="button"
                aria-expanded={open}
                aria-controls="design-panel"
                onClick={toggleOpen}
                className="design-panel-surface cursor-pointer rounded-full border px-3 py-1.5 shadow-lg"
            >
                {open ? "Close" : "Design"}
            </button>
        </div>
    );
}
