import NavBar from "@/components/NavBar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ paddingBottom: 100 }}>
      <NavBar showLogo exitDelay={0.2} />
      {children}
    </div>
  );
}
