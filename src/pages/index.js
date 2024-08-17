import { useState } from "react";
import CourseList from "../components/CourseList";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination"; // Importujemy nowy komponent
import useCourses from "../hooks/useCourses";

export default function Home() {
  const { courses, filteredCourses, loading, filterCourses } = useCourses();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCourses = filteredCourses.slice(startIndex, endIndex);

  return (
    <div className="p-10 min-h-screen  flex flex-col items-center  w-full">
      <h1 className="text-5xl font-bold mb-8 text-center">
        Wyszukaj kierunek studiów, <br></br>zobacz czy do niego pasujesz albo{" "}
        <br></br>
        sprawdź co zaproponuje ci LOS.
      </h1>
      <div className="w-full max-w-4xl">
        <SearchBar onSearch={filterCourses} allCourses={courses} />
      </div>
      {loading ? (
        <p>Ładowanie...</p>
      ) : (
        <CourseList courses={paginatedCourses} />
      )}
      {!loading && (
        <Pagination
          totalItems={filteredCourses.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
