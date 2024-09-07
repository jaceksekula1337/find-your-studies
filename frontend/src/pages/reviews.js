import React, { useState } from "react";
import Reviews from "../components/Reviews"; // Poprawna ścieżka zależy od tego, gdzie znajduje się komponent Reviews

export default function ReviewsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("most_reviews");
  const [selectedRating, setSelectedRating] = useState(null);
  const [newReview, setNewReview] = useState({
    course: "",
    rating: 0,
    salaryRating: 0,
    teachingRating: 0,
    studentLifeRating: 0,
    comment: "",
  });

  // Obsługa wyszukiwania
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Obsługa filtrowania
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  // Obsługa wyboru oceny
  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
  };

  // Obsługa dodawania nowej opinii
  const handleNewReviewChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewReviewSubmit = (e) => {
    e.preventDefault();
    // Logika dodawania nowej opinii, np. wysyłanie do API
    console.log("Nowa opinia:", newReview);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-yellow-600 text-center">Opinie o Kierunkach Studiów</h1>

      {/* Wyszukiwarka */}
      <div className="mb-4">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Szukaj kierunku..."
          className="w-full p-2 border rounded"
        />
      </div>

      {/* Filtry */}
      <div className="flex justify-between mb-4">
        <div>
          <label className="block font-semibold mb-2">Sortuj według</label>
          <select
            value={sortOption}
            onChange={handleSortChange}
            className="p-2 border rounded"
          >
            <option value="most_reviews">Najwięcej opinii</option>
            <option value="best_rated">Najlepiej oceniane</option>
            <option value="latest">Najnowsze opinie</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-2">Filtruj według oceny</label>
          <div className="flex space-x-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <button
                key={rating}
                onClick={() => handleRatingChange(rating)}
                className={`p-2 border rounded ${selectedRating === rating ? "bg-yellow-600 text-white" : ""}`}
              >
                {rating} ★
              </button>
            ))}
            <button
              onClick={() => handleRatingChange(null)}
              className={`p-2 border rounded ${selectedRating === null ? "bg-gray-300" : ""}`}
            >
              Wyczyść
            </button>
          </div>
        </div>
      </div>

      {/* Lista opinii */}
      <Reviews searchQuery={searchQuery} sortOption={sortOption} selectedRating={selectedRating} />

      {/* Formularz dodawania opinii */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Dodaj swoją opinię</h2>
        <form onSubmit={handleNewReviewSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-2">Wybierz kierunek</label>
            <input
              type="text"
              name="course"
              value={newReview.course}
              onChange={handleNewReviewChange}
              placeholder="Nazwa kierunku"
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-semibold mb-2">Ocena ogólna</label>
            <select
              name="rating"
              value={newReview.rating}
              onChange={handleNewReviewChange}
              className="w-full p-2 border rounded"
            >
              <option value={0}>Wybierz ocenę</option>
              {[5, 4, 3, 2, 1].map((rating) => (
                <option key={rating} value={rating}>
                  {rating} ★
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-2">Możliwość zarobkowa</label>
            <select
              name="salaryRating"
              value={newReview.salaryRating}
              onChange={handleNewReviewChange}
              className="w-full p-2 border rounded"
            >
              <option value={0}>Wybierz ocenę</option>
              {[5, 4, 3, 2, 1].map((rating) => (
                <option key={rating} value={rating}>
                  {rating} ★
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-2">Jakość nauczania</label>
            <select
              name="teachingRating"
              value={newReview.teachingRating}
              onChange={handleNewReviewChange}
              className="w-full p-2 border rounded"
            >
              <option value={0}>Wybierz ocenę</option>
              {[5, 4, 3, 2, 1].map((rating) => (
                <option key={rating} value={rating}>
                  {rating} ★
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-2">Życie studenckie</label>
            <select
              name="studentLifeRating"
              value={newReview.studentLifeRating}
              onChange={handleNewReviewChange}
              className="w-full p-2 border rounded"
            >
              <option value={0}>Wybierz ocenę</option>
              {[5, 4, 3, 2, 1].map((rating) => (
                <option key={rating} value={rating}>
                  {rating} ★
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-2">Opinia</label>
            <textarea
              name="comment"
              value={newReview.comment}
              onChange={handleNewReviewChange}
              placeholder="Podziel się swoją opinią"
              className="w-full p-2 border rounded"
              rows={4}
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 bg-yellow-600 text-white rounded"
          >
            Dodaj opinię
          </button>
        </form>
      </div>
    </div>
  );
}
