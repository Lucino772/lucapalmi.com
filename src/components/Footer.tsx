import { about } from "@/content/about";

export default function Footer() {
    return (
        <footer className="border-line text-faint mt-auto w-full border-t text-[0.8125rem]">
            <div className="max-w-page mx-auto flex w-full flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:justify-between md:px-6">
                <p className="flex items-center gap-2.5">
                    <span
                        aria-hidden
                        className="bg-accent inline-block size-1.5 rounded-full"
                    />
                    Open to freelance work and interesting roles.
                </p>
                <div className="flex items-center gap-5">
                    <a
                        href={about.links.github}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-fg transition-colors duration-150"
                    >
                        GitHub
                    </a>
                    <a
                        href={about.links.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-fg transition-colors duration-150"
                    >
                        LinkedIn
                    </a>
                    <span className="tabular-nums">
                        © {new Date().getFullYear()} {about.name}
                    </span>
                </div>
            </div>
        </footer>
    );
}
