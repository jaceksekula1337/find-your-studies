import Link from "next/link";

export default function Home() {
  return (
    <div className="p-10 min-h-screen bg-gray-400 flex flex-col justify-center items-center">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">
        Witaj w Wyszukiwarce Studiów
      </h1>
      <nav className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
        <ul className="space-y-4">
          <li>
            <Link href="/search/1">
              <div className="block p-4 bg-blue-500 text-white rounded-lg text-center hover:bg-blue-600 transition duration-300 cursor-pointer">
                Wyszukiwarka Kierunków
              </div>
            </Link>
          </li>
          <li>
            <Link href="/quiz">
              <div className="block p-4 bg-green-500 text-white rounded-lg text-center hover:bg-green-600 transition duration-300 cursor-pointer">
                Quiz Preferencji
              </div>
            </Link>
          </li>
          <li>
            <Link href="/wheel">
              <div className="block p-4 bg-purple-500 text-white rounded-lg text-center hover:bg-purple-600 transition duration-300 cursor-pointer">
                Koło Fortuny
              </div>
            </Link>
          </li>
          <li>
            <Link href="/reviews">
              <div className="block p-4 bg-yellow-500 text-white rounded-lg text-center hover:bg-yellow-600 transition duration-300 cursor-pointer">
                Opinie
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
