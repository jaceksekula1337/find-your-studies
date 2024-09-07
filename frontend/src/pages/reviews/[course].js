import React from "react";
import { useRouter } from "next/router";

const courseReviews = {
  informatyka: [
    {
      id: 1,
      university: "Uniwersytet Warszawski",
      rating: 5,
      salaryRating: 4,
      teachingRating: 5,
      studentLifeRating: 4,
      comment:
        "Świetny kierunek! Bardzo dobrze przygotowuje do pracy w branży IT.",
      date: "2024-08-16",
    },
    // inne opinie o Informatyce
  ],
  prawo: [
    {
      id: 2,
      university: "Uniwersytet Jagielloński",
      rating: 4,
      salaryRating: 3,
      teachingRating: 4,
      studentLifeRating: 3,
      comment:
        "Dobrze zorganizowane zajęcia, ale bardzo dużo materiału do przyswojenia.",
      date: "2024-07-20",
    },
    // inne opinie o Prawie
  ],
  // inne kierunki
};

export default function CourseReviewsPage() {
  const router = useRouter();
  const { course } = router.query;

  const reviews = courseReviews[course];

  if (!reviews) {
    return <p>Nie znaleziono opinii dla tego kierunku.</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-yellow-600">
        Opinie o kierunku {course.charAt(0).toUpperCase() + course.slice(1)}
      </h1>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="p-4 border rounded shadow-sm">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">{review.university}</h3>
              <span className="text-yellow-500 text-2xl">
                {Array(review.rating).fill("★").join("")}
              </span>
            </div>
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
          </div>
        ))}
      </div>
    </div>
  );
}
