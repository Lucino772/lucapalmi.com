export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div style={{ paddingBottom: 100 }}>{children}</div>;
}
