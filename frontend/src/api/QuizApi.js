import axios from "axios";

const QUIZ_RESULTS_API_URL = "http://127.0.0.1:8000/matching/quiz-results/";

// Funkcja do wysyłania odpowiedzi quizu i uzyskania rekomendacji
export const fetchQuizResults = async (answers) => {
  try {
    const response = await axios.post(QUIZ_RESULTS_API_URL, { answers });
    return response.data; // Zwraca dane rekomendacji i alertów
  } catch (error) {
    console.error("Błąd podczas pobierania wyników quizu:", error);
    throw error;
  }
};
