import Link from "next/link";

export default function NotFound() {
    return (
        <div className="relative mx-auto my-0 flex h-screen max-w-4xl flex-col items-center justify-center">
            <h1 className="font-headings mb-4 text-4xl font-bold text-white">
                404 - Not found
            </h1>
            <h2 className="font-content text-lg text-gray-300">
                {`Sorry, the page you're looking for doesn't exist.`}
            </h2>
            <div className="font-content mt-2 flex flex-row justify-center gap-5">
                <Link
                    className="text-[#7b97ea]/80 transition duration-100 hover:text-[#7b97ea]"
                    href="/"
                >
                    Home
                </Link>
                <Link
                    className="text-[#7b97ea]/80 transition duration-100 hover:text-[#7b97ea]"
                    href="/projects"
                >
                    Projects
                </Link>
                <Link
                    className="text-[#7b97ea]/80 transition duration-100 hover:text-[#7b97ea]"
                    href="/projects"
                >
                    Blog
                </Link>
            </div>
        </div>
    );
}
