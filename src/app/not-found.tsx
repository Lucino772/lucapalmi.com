import type { Metadata } from "next";
import Link from "next/link";
import MissingPath from "@/components/MissingPath";

export const metadata: Metadata = {
    title: "Page not found | Luca Palmisano",
};

export default function NotFound() {
    return (
        <div className="max-w-page mx-auto w-full px-5 pt-12 pb-24 md:px-6 md:pt-24">
            <div className="grid gap-x-10 md:grid-cols-[12rem_minmax(0,1fr)]">
                <p className="text-faint mb-4 text-[0.9375rem] tabular-nums md:mb-0 md:pt-1">
                    exit 404
                </p>
                <div className="max-w-[40rem]">
                    <MissingPath />
                    <h1 className="mt-8 text-[1.75rem] leading-tight font-semibold tracking-[-0.02em] md:text-[2rem]">
                        This page does not exist.
                    </h1>
                    <p className="text-muted mt-3 text-[0.9375rem] leading-7">
                        The link may be old, or the address mistyped. One of
                        these should get you back on track:
                    </p>
                    <ul className="mt-6 flex flex-col text-[0.9375rem] leading-7">
                        {[
                            { href: "/", cmd: "cd ~", hint: "home" },
                            {
                                href: "/articles",
                                cmd: "cd ~/writing",
                                hint: "essays and notes",
                            },
                            {
                                href: "/projects",
                                cmd: "cd ~/projects",
                                hint: "what I build",
                            },
                        ].map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className="group hover:bg-raised -mx-3 grid grid-cols-[17ch_1fr] gap-x-[2ch] rounded-[4px] px-3 py-1.5 transition-colors duration-150"
                                >
                                    <span className="text-accent-text">
                                        <span
                                            aria-hidden
                                            className="text-faint"
                                        >
                                            {"$ "}
                                        </span>
                                        {item.cmd}
                                    </span>
                                    <span className="text-faint group-hover:text-muted">
                                        {item.hint}
                                    </span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
