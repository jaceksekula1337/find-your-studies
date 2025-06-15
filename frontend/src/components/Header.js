import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 w-full bg-black text-white border-b border-gray-800 shadow-[0_2px_10px_rgba(0,0,0,0.4)] z-50 py-4 px-4">
      <div className="max-w-5xl mx-auto flex justify-center items-center">
        <Link
          href="/"
          className="text-2xl font-bold text-purple-500 hover:text-purple-400 transition"
        >
          Find Your Studies
        </Link>
      </div>
    </header>
  );
}
