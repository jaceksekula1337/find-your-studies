import { useRouter } from "next/router";
import SearchBar from "../../components/SearchBar";

export default function Search() {
  const router = useRouter();
  const { page } = router.query;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-blue-600">
        Wyszukiwarka Kierunków - Strona {page}
      </h1>
      <SearchBar />
    </div>
  );
}
