import React from "react";
import { useRouter } from "next/router";

const sampleReviews = [
  {
    id: 1,
    course: "Informatyka",
    university: "Uniwersytet Warszawski",
    rating: 5,
    salaryRating: 4,
    teachingRating: 5,
    studentLifeRating: 4,
    comment: "Świetny kierunek! Bardzo dobrze przygotowuje do pracy w branży IT.",
    date: "2024-08-16",
  },
  {
    id: 2,
    course: "Prawo",
    university: "Uniwersytet Jagielloński",
    rating: 4,
    salaryRating: 3,
    teachingRating: 4,
    studentLifeRating: 3,
    comment: "Dobrze zorganizowane zajęcia, ale bardzo dużo materiału do przyswojenia.",
    date: "2024-07-20",
  },
  {
    id: 3,
    course: "Psychologia",
    university: "Uniwersytet Wrocławski",
    rating: 3,
    salaryRating: 2,
    teachingRating: 4,
    studentLifeRating: 3,
    comment: "Kierunek ciekawy, ale brakuje praktycznych zajęć.",
    date: "2024-06-10",
  },
];

export default function Reviews({ searchQuery, sortOption, selectedRating }) {
  const router = useRouter();

  // Filtruj i sortuj opinie na podstawie przekazanych propsów
  const filteredReviews = sampleReviews
    .filter(
      (review) =>
        review.course.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedRating ? review.rating === selectedRating : true)
    )
    .sort((a, b) => {
      if (sortOption === "most_reviews") {
        return b.id - a.id; // Przykładowe sortowanie, można dostosować
      } else if (sortOption === "best_rated") {
        return b.rating - a.rating;
      } else if (sortOption === "latest") {
        return new Date(b.date) - new Date(a.date);
      }
      return 0;
    });

  const handleReviewClick = (course) => {
    router.push(`/reviews/${course.toLowerCase()}`);
  };

  return (
    <div className="space-y-4">
      {filteredReviews.length > 0 ? (
        filteredReviews.map((review) => (
          <div key={review.id} className="p-4 border rounded shadow-sm">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">{review.course}</h3>
              <span className="text-yellow-500 text-2xl">
                {Array(review.rating).fill("★").join("")}
              </span>
            </div>
            <p className="text-gray-600">{review.university}</p>
            <div className="mt-2 flex space-x-4">
              <div>
                <strong>Możliwość zarobkowa:</strong>
                <span className="text-yellow-500 ml-2">
                  {Array(review.salaryRating).fill("★").join("")}
                </span>
              </div>
              <div>
                <strong>Jakość nauczania:</strong>
                <span className="text-yellow-500 ml-2">
                  {Array(review.teachingRating).fill("★").join("")}
                </span>
              </div>
              <div>
                <strong>Życie studenckie:</strong>
                <span className="text-yellow-500 ml-2">
                  {Array(review.studentLifeRating).fill("★").join("")}
                </span>
              </div>
            </div>
            <p className="mt-2">{review.comment}</p>
            <p className="mt-2 text-sm text-gray-500">Dodano: {review.date}</p>
            <button
              onClick={() => handleReviewClick(review.course)}
              className="mt-4 text-blue-600 underline"
            >
              Zobacz więcej opinii
            </button>
          </div>
        ))
      ) : (
        <p>Brak opinii spełniających kryteria wyszukiwania.</p>
      )}
    </div>
  );
}
