import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md p-4">
        <ul className="flex space-x-4">
          <li>
            <Link href="/">
              <div className="text-blue-500 hover:underline cursor-pointer">
                Wyszukiwarka Kierunków
              </div>
            </Link>
          </li>
          <li>
            <Link href="/quiz">
              <div className="text-green-500 hover:underline cursor-pointer">
                Quiz Preferencji
              </div>
            </Link>
          </li>
          <li>
            <Link href="/wheel">
              <div className="text-purple-500 hover:underline cursor-pointer">
                Koło Fortuny
              </div>
            </Link>
          </li>
          <li>
            <Link href="/reviews">
              <div className="text-yellow-500 hover:underline cursor-pointer">
                Opinie
              </div>
            </Link>
          </li>
        </ul>
      </nav>
      <main className="flex flex-col justify-center items-center">
        {children}
      </main>
    </div>
  );
}
