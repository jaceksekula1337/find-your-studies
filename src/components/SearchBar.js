import { useState } from 'react';

export default function SearchBar() {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    // tutaj podłączysz API wyszukiwania kierunków
    console.log(`Szukam: ${query}`);
  };

  return (
    <div className="flex items-center space-x-2">
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
  );
}
