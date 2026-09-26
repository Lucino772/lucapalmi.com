export const navItems = [
    { href: "/articles", label: "Writing", path: "~/writing" },
    { href: "/projects", label: "Projects", path: "~/projects" },
] as const;

export function isActive(pathname: string, href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
}
