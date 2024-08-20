import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md flex justify-between items-center">
      <div className="text-2xl font-bold ml-9 text-violet-800">
        <Link href="/">Find my studies</Link>
      </div>
      <nav className="flex">
        <Link href="/" className="hover:bg-violet-400 p-4 block">
          <div>Wyszukiwarka kierunków</div>
        </Link>
        <Link href="/quiz" className="hover:bg-violet-400 p-4 block">
          <div>Co do mnie pasuje?</div>
        </Link>
        <Link href="/wheel" className="hover:bg-violet-400 p-4 block">
          <div>Wylosuj mi STUDIA</div>
        </Link>
        <Link href="/reviews" className="hover:bg-violet-400 p-4 block">
          <div>Opinie o kierunkach</div>
        </Link>
      </nav>
      <button className="bg-violet-700 text-white px-4 py-2 mr-8 rounded">
        Logowanie
      </button>
    </header>
  );
}
