import useCourses from "../hooks/useCourses";
import CourseList from "../components/CourseList";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const { filteredCourses, loading, filterCourses } = useCourses();

  return (
    <div className="p-20 min-h-screen bg-gray-400 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">
        Wyszukiwarka Kierunków
      </h1>
      <SearchBar onSearch={filterCourses} />
      {loading ? <p>Ładowanie...</p> : <CourseList courses={filteredCourses} />}
    </div>
  );
}
