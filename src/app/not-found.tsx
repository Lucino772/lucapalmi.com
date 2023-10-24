import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative mx-auto my-0 flex h-screen max-w-4xl flex-col items-center justify-center">
      <h1 className="mb-4 text-4xl font-bold text-white">404 - Not found</h1>
      <h2 className="text-lg text-gray-300">
        {`Sorry, the page you're looking for doesn't exist.`}
      </h2>
      <div className="mt-2 flex flex-row gap-2">
        <Link
          className="text-[#4169E1] text-opacity-80 transition duration-100 hover:text-opacity-100"
          href="/"
        >
          Home
        </Link>
        <Link
          className="text-[#4169E1] text-opacity-80 transition duration-100 hover:text-opacity-100"
          href="/about"
        >
          About
        </Link>
        <Link
          className="text-[#4169E1] text-opacity-80 transition duration-100 hover:text-opacity-100"
          href="/projects"
        >
          Projects
        </Link>
      </div>
    </div>
  );
}
