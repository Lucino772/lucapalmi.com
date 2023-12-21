import Image from "next/image";

export default function Index() {
  return (
    <>
      {/* Background Overlay */}
      <div
        className="absolute left-1/2 top-1/2 -z-10 h-screen w-screen max-w-6xl -translate-x-1/2 -translate-y-1/2 overflow-hidden"
        style={{
          background: "linear-gradient(80deg, #242424 50%, #272727 50%)",
        }}
      >
        <Image
          className="absolute right-7 top-32 w-1/2 animate-fade-in object-cover object-top xl:top-60"
          src="/images/desktop-dimmed.webp"
          alt="Desktop"
          width={400}
          height={535}
        />
        <div
          className="absolute h-full w-full"
          style={{
            background: "linear-gradient(80deg, #242424 50%, transparent 50%)",
          }}
        ></div>
      </div>
    </>
  );
}
