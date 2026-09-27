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

// Fence language (rehype-highlight's `language-*` class) to strip label
const languages: Record<string, string> = {
    sh: "shell",
    bash: "shell",
    ts: "typescript",
    js: "javascript",
};

// The language strip sits outside the horizontal scroller, so it stays put
// and spans the block while only the code body scrolls
function CodeBlock({ children, ...props }: ComponentProps<"pre">) {
    const className = isValidElement<{ className?: string }>(children)
        ? (children.props.className ?? "")
        : "";
    const id = /(?:^|\s)language-(\S+)/.exec(className)?.[1];
    const language = id && (languages[id] ?? id);
    return (
        <div className="code-block">
            {language && <div className="code-block-lang">{language}</div>}
            <pre {...props}>{children}</pre>
        </div>
    );
}

// Headings get stable ids so sections can be linked and navigated
const components: MDXComponents = {
    pre: CodeBlock,
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
