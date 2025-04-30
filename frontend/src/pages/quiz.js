import { useState } from "react";
import Pagination from "../components/Pagination";
import FormInput from "../components/FormInput";

const questions = [
  // OPENNESS
  {
    id: 1,
    identifier: "O_try_new_things",
    question: "Lubię próbować nowych rzeczy.",
    category: "openness",
    answers: ["Zdecydowanie tak", "Czasami", "Raczej nie"],
  },
  {
    id: 2,
    identifier: "O_art_culture",
    question: "Interesuję się sztuką i kulturą.",
    category: "openness",
    answers: ["Bardzo", "Trochę", "Wcale"],
  },
  {
    id: 3,
    identifier: "O_creative_thinking",
    question: "Lubię myśleć w nieszablonowy sposób.",
    category: "openness",
    answers: ["Tak", "Nie zawsze", "Raczej nie"],
  },

  // CONSCIENTIOUSNESS
  {
    id: 4,
    identifier: "C_task_completion",
    question: "Zawsze kończę rozpoczęte zadania.",
    category: "conscientiousness",
    answers: ["Zdecydowanie tak", "Czasem", "Raczej nie"],
  },
  {
    id: 5,
    identifier: "C_organized",
    question: "Jestem dobrze zorganizowany/a.",
    category: "conscientiousness",
    answers: ["Zdecydowanie", "Trochę", "Nie bardzo"],
  },
  {
    id: 6,
    identifier: "C_time_management",
    question: "Potrafię zarządzać swoim czasem efektywnie.",
    category: "conscientiousness",
    answers: ["Tak", "Zależy od dnia", "Raczej nie"],
  },

  // EXTRAVERSION
  {
    id: 7,
    identifier: "E_attention_seeker",
    question: "Lubię być w centrum uwagi.",
    category: "extraversion",
    answers: ["Zdecydowanie tak", "Czasami", "Unikam tego"],
  },
  {
    id: 8,
    identifier: "E_social_energy",
    question: "Czerpię energię z kontaktów z ludźmi.",
    category: "extraversion",
    answers: ["Tak", "Zależy", "Nie"],
  },
  {
    id: 9,
    identifier: "E_teamwork",
    question: "Lubię pracę zespołową.",
    category: "extraversion",
    answers: ["Bardzo", "Może być", "Wolę pracować sam/a"],
  },

  // AGREEABLENESS
  {
    id: 10,
    identifier: "A_helping_others",
    question: "Pomaganie innym sprawia mi radość.",
    category: "agreeableness",
    answers: ["Tak", "Czasem", "Nie bardzo"],
  },
  {
    id: 11,
    identifier: "A_easy_connecting",
    question: "Łatwo nawiązuję kontakt z innymi ludźmi.",
    category: "agreeableness",
    answers: ["Zdecydowanie tak", "Zależy", "Raczej nie"],
  },
  {
    id: 12,
    identifier: "A_forgiving",
    question: "Jestem wyrozumiały/a wobec błędów innych.",
    category: "agreeableness",
    answers: ["Bardzo", "Średnio", "Nie"],
  },

  // NEUROTICISM
  {
    id: 13,
    identifier: "N_stress_prone",
    question: "Często się stresuję.",
    category: "neuroticism",
    answers: ["Tak", "Rzadko", "Prawie nigdy"],
  },
  {
    id: 14,
    identifier: "N_unwarranted_worry",
    question: "Zdarza mi się martwić bez powodu.",
    category: "neuroticism",
    answers: ["Często", "Czasem", "Nigdy"],
  },
  {
    id: 15,
    identifier: "N_low_resilience",
    question: "Mam problemy z utrzymaniem spokoju w trudnych sytuacjach.",
    category: "neuroticism",
    answers: ["Tak", "Zależy", "Nie"],
  },
];

// Miksujemy po kategoriach
const organizeQuestionsAlternating = (questions) => {
  const grouped = {};

  questions.forEach((q) => {
    if (!grouped[q.category]) grouped[q.category] = [];
    grouped[q.category].push(q);
  });

  const rounds = Math.max(...Object.values(grouped).map((g) => g.length));
  const final = [];

  for (let i = 0; i < rounds; i++) {
    for (let cat in grouped) {
      if (grouped[cat][i]) {
        final.push(grouped[cat][i]);
      }
    }
  }

  return final;
};

export default function Quiz() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [formValues, setFormValues] = useState({});
  const [results, setResults] = useState(null);

  const handlePageChange = (page) => setCurrentPage(page);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const interpretAnswer = (text) => {
    if (
      text === "Zdecydowanie tak" ||
      text === "Bardzo" ||
      text === "Tak" ||
      text === "Zdecydowanie"
    )
      return 2;
    if (
      text === "Czasami" ||
      text === "Czasem" ||
      text === "Trochę" ||
      text === "Zależy" ||
      text === "Nie zawsze" ||
      text === "Średnio"
    )
      return 1;
    return 0;
  };

  const handleSubmit = async () => {
    const answers = {};

    questions.forEach((q) => {
      const val = formValues[`question${q.id}`];
      if (val !== undefined) {
        answers[q.identifier] = interpretAnswer(val);
      }
    });

    try {
      const res = await fetch(
        "http://localhost:8000/matching/course-recommendations/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ answers }),
        }
      );

      const data = await res.json();
      console.log("📊 Otrzymane dopasowania:", data.recommended_courses);
      setResults(data.recommended_courses);
    } catch (err) {
      console.error("❌ Błąd przy wysyłaniu danych:", err);
    }
  };

  const orderedQuestions = organizeQuestionsAlternating(questions);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedQuestions = orderedQuestions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="py-8">
          <h1 className="text-5xl text-center">
            Odpowiedz na kilka pytań, które pozwolą nam lepiej dopasować
            kierunki studiów.
          </h1>
        </div>

        <hr className="border-t-4 border-gray-300 my-4" />
      </div>

      {paginatedQuestions.map((question) => (
        <div key={question.id} className="mb-4">
          <h2 className="text-xl font-semibold mb-2">{question.question}</h2>
          {question.answers.map((answer, index) => (
            <FormInput
              key={index}
              type="radio"
              name={`question${question.id}`}
              value={formValues[`question${question.id}`]}
              options={[{ value: answer, label: answer }]}
              onChange={handleInputChange}
            />
          ))}
        </div>
      ))}

      <Pagination
        totalItems={questions.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />

      <div className="mt-8 text-center">
        <button
          onClick={handleSubmit}
          className="bg-green-600 text-white py-2 px-4 rounded"
        >
          Zobacz dopasowania
        </button>
        <p className="mt-2 text-sm text-gray-500">
          Odpowiedz na więcej pytań, żeby dopasowanie było jeszcze trafniejsze.
        </p>
      </div>

      {results && (
        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-2">Top kierunki:</h2>
          <ul className="list-disc pl-6">
            {results.slice(0, 5).map((course, idx) => (
              <li key={idx}>
                {course.course_name} — {course.score} pkt
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
