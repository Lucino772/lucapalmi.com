import { about } from "@/content/about";

// Quiet essentials only, like an editor's status bar
export default function Footer() {
    return (
        <footer className="border-line text-faint mt-auto w-full border-t text-[0.8125rem]">
            <div className="max-w-page mx-auto flex w-full items-center justify-between gap-5 px-5 py-5 md:px-6">
                <span className="tabular-nums">
                    © {new Date().getFullYear()} {about.name}
                </span>
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
                </div>
            </div>
        </footer>
    );
}
