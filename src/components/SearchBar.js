import { useState, useEffect } from "react";

export default function SearchBar({ onSearch, allCourses }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [institutionNameQuery, setInstitutionNameQuery] = useState("");
  const [institutionSuggestions, setInstitutionSuggestions] = useState([]);
  const [filters, setFilters] = useState({
    institutionType: "Wszystkie",
    voivodeship: "",
    institutionName: "",
    studyMode: "Stacjonarne",
    studyLevel: "1",
  });

  // Sugestie dla kierunków studiów
  useEffect(() => {
    if (query.length > 0 && allCourses && allCourses.length > 0) {
      const filteredSuggestions = allCourses
        .filter((course) =>
          course.courseName.toLowerCase().includes(query.toLowerCase())
        )
        .map((course) => course.courseName);

      // Usuwanie duplikatów i ograniczenie do 5 wyników
      const uniqueSuggestions = [...new Set(filteredSuggestions)].slice(0, 3);

      setSuggestions(uniqueSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [query, allCourses]);

  // Sugestie dla nazw uczelni
  useEffect(() => {
    if (
      institutionNameQuery.length > 0 &&
      allCourses &&
      allCourses.length > 0
    ) {
      const filteredInstitutionSuggestions = allCourses
        .filter((course) =>
          course.leadingInstitutionName
            .toLowerCase()
            .includes(institutionNameQuery.toLowerCase())
        )
        .map((course) => course.leadingInstitutionName);

      // Usuwanie duplikatów i ograniczenie do 5 wyników
      const uniqueInstitutionSuggestions = [
        ...new Set(filteredInstitutionSuggestions),
      ].slice(0, 3);

      setInstitutionSuggestions(uniqueInstitutionSuggestions);
    } else {
      setInstitutionSuggestions([]);
    }
  }, [institutionNameQuery, allCourses]);

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

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
    onSearch(suggestion, filters);
  };

  const handleInstitutionSuggestionClick = (suggestion) => {
    setInstitutionNameQuery(suggestion);
    setInstitutionSuggestions([]);
    setFilters((prevFilters) => ({
      ...prevFilters,
      institutionName: suggestion,
    }));
    onSearch(query, { ...filters, institutionName: suggestion });
  };

  return (
    <div className="mb-8 relative">
      <div className="flex flex-col space-y-4 mb-4">
        <div>
          <label className="block mb-2">Wyszukaj kierunek:</label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Szukaj kierunków..."
            className="border p-2 rounded w-full"
          />
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
        </div>
        <div>
          <label className="block mb-2">Wyszukaj nazwę uczelni:</label>
          <input
            type="text"
            name="institutionName"
            value={institutionNameQuery}
            onChange={(e) => setInstitutionNameQuery(e.target.value)}
            placeholder="Filtruj według nazwy uczelni..."
            className="border p-2 rounded w-full"
          />
          {institutionSuggestions.length > 0 && (
            <ul className="absolute bg-white border rounded w-full max-h-40 overflow-y-auto z-10">
              {institutionSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-gray-200"
                  onClick={() => handleInstitutionSuggestionClick(suggestion)}
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex space-x-4">
          <div>
            <label className="block mb-2">Typ uczelni:</label>
            <select
              name="institutionType"
              value={filters.institutionType}
              onChange={handleFilterChange}
              className="border p-2 rounded w-full"
            >
              <option value="Wszystkie">Wszystkie</option>
              <option value="Uczelnia publiczna">Publiczne</option>
              <option value="Uczelnia niepubliczna">Niepubliczne</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Województwo:</label>
            <select
              name="voivodeship"
              value={filters.voivodeship}
              onChange={handleFilterChange}
              className="border p-2 rounded w-full"
            >
              <option value="">Wszystkie</option>
              <option value="Dolnośląskie">Dolnośląskie</option>
              <option value="Kujawsko-pomorskie">Kujawsko-pomorskie</option>
              <option value="Lubelskie">Lubelskie</option>
              <option value="Lubuskie">Lubuskie</option>
              <option value="Łódzkie">Łódzkie</option>
              <option value="Małopolskie">Małopolskie</option>
              <option value="Mazowieckie">Mazowieckie</option>
              <option value="Opolskie">Opolskie</option>
              <option value="Podkarpackie">Podkarpackie</option>
              <option value="Podlaskie">Podlaskie</option>
              <option value="Pomorskie">Pomorskie</option>
              <option value="Śląskie">Śląskie</option>
              <option value="Świętokrzyskie">Świętokrzyskie</option>
              <option value="Warmińsko-mazurskie">Warmińsko-mazurskie</option>
              <option value="Wielkopolskie">Wielkopolskie</option>
              <option value="Zachodniopomorskie">Zachodniopomorskie</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Tryb studiów:</label>
            <select
              name="studyMode"
              value={filters.studyMode}
              onChange={handleFilterChange}
              className="border p-2 rounded w-full"
            >
              <option value="Stacjonarne">Stacjonarne</option>
              <option value="Niestacjonarne">Niestacjonarne</option>
            </select>
          </div>
          <div>
            <label className="block mb-2">Stopień studiów:</label>
            <select
              name="studyLevel"
              value={filters.studyLevel}
              onChange={handleFilterChange}
              className="border p-2 rounded w-full"
            >
              <option value="1">1</option>
              <option value="2">2</option>
            </select>
          </div>
        </div>
      </div>

      <button
        onClick={handleSearch}
        className="bg-violet-500 text-white p-2 rounded w-full"
      >
        Szukaj
      </button>
    </div>
  );
}
