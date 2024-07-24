import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    institution: "",
  });

  const handleSearch = () => {
    onSearch(query, filters);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div className="mb-6 ">
      <div className="flex items-center space-x-2 mb-4 ">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Szukaj kierunków..."
          className="border p-2 rounded"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Szukaj
        </button>
      </div>
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
