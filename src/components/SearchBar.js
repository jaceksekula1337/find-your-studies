import { useState, useEffect } from 'react';

export default function SearchBar({ onSearch, allCourses }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [filters, setFilters] = useState({
    institution: ''
  });

  useEffect(() => {
    if (query.length > 0) {
      const filteredSuggestions = allCourses
        .filter((course) =>
          course.courseName.toLowerCase().includes(query.toLowerCase())
        )
        .map((course) => course.courseName);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [query, allCourses]);

  const handleSearch = () => {
    onSearch(query, filters);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
    onSearch(suggestion, filters); // Optionally trigger search with suggestion
  };

  return (
    <div className="mb-6 relative">
      <div className="flex items-center space-x-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Szukaj kierunków..."
          className="border p-2 rounded"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white p-2 rounded">
          Szukaj
        </button>
      </div>
      {suggestions.length > 0 && (
        <ul className="absolute bg-white border rounded w-full max-h-40 overflow-y-auto z-10">
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
      <div className="flex items-center space-x-2">
        <input
          type="text"
          name="institution"
          value={filters.institution}
          onChange={handleFilterChange}
          placeholder="Filtruj według instytucji..."
          className="border p-2 rounded"
        />
        {/* Add more filters as needed */}
      </div>
    </div>
  );
}
