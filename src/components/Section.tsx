import Link from "next/link";
import { cn } from "@/lib/cn";

type Props = React.PropsWithChildren<{
    id: string;
    path: string;
    title: string;
    link?: { href: string; label: string };
    className?: string;
}>;

// A section addressed by its path: the gutter holds the label, content runs right
export default function Section({
    id,
    path,
    title,
    link,
    className,
    children,
}: Props) {
    return (
        <section
            aria-labelledby={id}
            className={cn(
                "grid gap-x-10 gap-y-5 md:grid-cols-[12rem_minmax(0,1fr)]",
                className,
            )}
        >
            <div className="flex items-baseline justify-between gap-4 md:flex-col md:justify-start md:gap-1.5">
                <h2
                    id={id}
                    className="text-[0.9375rem] leading-7 font-semibold"
                >
                    <span className="sr-only">{title}</span>
                    <span aria-hidden>{path}</span>
                </h2>
                {link && (
                    <Link
                        href={link.href}
                        className="text-muted hover:text-accent-text text-[0.8125rem] underline decoration-current/30 underline-offset-4 transition-colors duration-150"
                    >
                        {link.label}
                    </Link>
                )}
            </div>
            <div className="min-w-0">{children}</div>
        </section>
    );
}
