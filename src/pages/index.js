import CourseList from "../components/CourseList";
import SearchBar from "../components/SearchBar";
import useCourses from "../hooks/useCourses";

export default function Home() {
  const { courses, filteredCourses, loading, filterCourses } = useCourses();
  
  return (
    <div className="p-10 min-h-screen bg-violet-50 flex flex-col items-center  w-full">
      <h1 className="text-5xl font-bold mb-8 text-center">
        Wyszukaj kierunek studiów, <br></br>zobacz czy do niego pasujesz albo{" "}
        <br></br>
        sprawdź co zaproponuje ci LOS.
      </h1>
      <div className="w-full max-w-4xl">
        <SearchBar onSearch={filterCourses} allCourses={courses} />
      </div>
      {loading ? <p>Ładowanie...</p> : <CourseList courses={filteredCourses} />}
      {/* Paginate below */}
      <div className="flex justify-center mt-8">
        <button className="mx-1">← Previous</button>
        {/* Pagination numbers */}
        {[...Array(5).keys()].map((page) => (
          <button key={page} className="mx-1">
            {page + 1}
          </button>
        ))}
        <button className="mx-1">Next →</button>
      </div>
    </div>
  );
}
