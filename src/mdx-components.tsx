import type { MDXComponents } from "mdx/types";
import { isValidElement, type ComponentProps, type ReactNode } from "react";

function textOf(node: ReactNode): string {
    if (typeof node === "string" || typeof node === "number") {
        return String(node);
    }
    if (Array.isArray(node)) {
        return node.map(textOf).join("");
    }
    if (isValidElement<{ children?: ReactNode }>(node)) {
        return textOf(node.props.children);
    }
    return "";
}

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/[\s-]+/g, "-");
}

// Headings get stable ids so sections can be linked and navigated
const components: MDXComponents = {
    h2: ({ id, children, ...props }: ComponentProps<"h2">) => (
        <h2 id={id ?? slugify(textOf(children))} {...props}>
            {children}
        </h2>
    ),
    h3: ({ id, children, ...props }: ComponentProps<"h3">) => (
        <h3 id={id ?? slugify(textOf(children))} {...props}>
            {children}
        </h3>
    ),
};

export function useMDXComponents(): MDXComponents {
    return components;
}
