import { useState, useEffect } from "react";

const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch("/data.json"); // Plik data.json musi być w katalogu public
        const data = await response.json();
        setCourses(data.results);
        setFilteredCourses(data.results);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filterCourses = (query, filters) => {
    let updatedCourses = courses;

    // Filtruj na podstawie nazwy kierunku
    if (query) {
      updatedCourses = updatedCourses.filter((course) =>
        course.courseName.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Filtruj na podstawie nazwy uczelni
    if (filters.institutionName) {
      updatedCourses = updatedCourses.filter((course) =>
        course.leadingInstitutionName
          .toLowerCase()
          .includes(filters.institutionName.toLowerCase())
      );
    }

    // Filtruj na podstawie typu uczelni
    if (filters.institutionType !== "Wszystkie") {
      updatedCourses = updatedCourses.filter((course) =>
        course.mainInstitutionKind
          .toLowerCase()
          .includes(filters.institutionType.toLowerCase())
      );
    }

    // Filtruj na podstawie województwa
    if (filters.voivodeship) {
      updatedCourses = updatedCourses.filter(
        (course) =>
          course.leadingInstitutionVoivodeship.toLowerCase() ===
          filters.voivodeship.toLowerCase()
      );
    }

    // Filtruj na podstawie trybu studiów
    if (filters.studyMode) {
      updatedCourses = updatedCourses.filter((course) =>
        course.courseInstances.some(
          (instance) =>
            instance.formName.toLowerCase() === filters.studyMode.toLowerCase()
        )
      );
    }

    // Filtruj na podstawie stopnia studiów
    if (filters.studyLevel) {
      updatedCourses = updatedCourses.filter((course) =>
        course.levelName.includes(
          filters.studyLevel === "1" ? "pierwszego" : "drugiego"
        )
      );
    }

    setFilteredCourses(updatedCourses);
  };

  return {
    courses,
    filteredCourses,
    loading,
    filterCourses,
  };
};

export default useCourses;
