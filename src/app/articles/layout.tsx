export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="max-w-full" style={{ paddingBottom: 100 }}>
            {children}
        </div>
    );
}
