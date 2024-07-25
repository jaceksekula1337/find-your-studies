import { useState, useEffect } from 'react';

const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/data.json');
        const data = await response.json();
        setCourses(data.results);
        setFilteredCourses(data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filterCourses = (query, filters) => {
    let updatedCourses = courses;

    if (query) {
      updatedCourses = updatedCourses.filter((course) =>
        course.courseName.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (filters.institution) {
      updatedCourses = updatedCourses.filter((course) =>
        course.leadingInstitutionName
          .toLowerCase()
          .includes(filters.institution.toLowerCase())
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
