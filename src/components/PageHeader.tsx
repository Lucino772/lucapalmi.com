type Props = React.PropsWithChildren<{
    path: string;
    title: string;
}>;

export default function PageHeader({ path, title, children }: Props) {
    return (
        <header className="fade-in pt-10 pb-10 md:pt-16 md:pb-14">
            <p className="text-faint text-[0.9375rem]" aria-hidden>
                {path}
            </p>
            <h1 className="mt-3 text-[2rem] leading-tight font-semibold tracking-[-0.02em] md:text-[2.5rem]">
                {title}
            </h1>
            {children && (
                <div className="text-muted mt-4 max-w-[60ch] text-[0.9375rem] leading-7">
                    {children}
                </div>
            )}
        </header>
    );
}
