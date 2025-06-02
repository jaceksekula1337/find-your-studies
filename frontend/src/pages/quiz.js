import { useState } from "react";
import Pagination from "../components/Pagination";
import FormInput from "../components/FormInput";

const questions = [
  {
    id: 1,
    identifier: "E_life_party",
    question: "I am the life of the party.",
    category: "extraversion",
  },
  {
    id: 2,
    identifier: "E_quiet",
    question: "I don’t talk a lot.",
    category: "extraversion",
    reverse: true,
  },
  {
    id: 3,
    identifier: "E_talk_people",
    question: "I talk to a lot of different people at parties.",
    category: "extraversion",
  },
  {
    id: 4,
    identifier: "E_background",
    question: "I keep in the background.",
    category: "extraversion",
    reverse: true,
  },

  {
    id: 5,
    identifier: "A_sympathize",
    question: "I sympathize with others’ feelings.",
    category: "agreeableness",
  },
  {
    id: 6,
    identifier: "A_not_care",
    question: "I am not interested in other people’s problems.",
    category: "agreeableness",
    reverse: true,
  },
  {
    id: 7,
    identifier: "A_feel_emotions",
    question: "I feel others’ emotions.",
    category: "agreeableness",
  },
  {
    id: 8,
    identifier: "A_not_interested",
    question: "I am not really interested in others.",
    category: "agreeableness",
    reverse: true,
  },

  {
    id: 9,
    identifier: "C_chores",
    question: "I get chores done right away.",
    category: "conscientiousness",
  },
  {
    id: 10,
    identifier: "C_forget_things",
    question: "I often forget to put things back in their proper place.",
    category: "conscientiousness",
    reverse: true,
  },
  {
    id: 11,
    identifier: "C_order",
    question: "I like order.",
    category: "conscientiousness",
  },
  {
    id: 12,
    identifier: "C_mess",
    question: "I make a mess of things.",
    category: "conscientiousness",
    reverse: true,
  },

  {
    id: 13,
    identifier: "N_mood_swings",
    question: "I have frequent mood swings.",
    category: "neuroticism",
  },
  {
    id: 14,
    identifier: "N_relaxed",
    question: "I am relaxed most of the time.",
    category: "neuroticism",
    reverse: true,
  },
  {
    id: 15,
    identifier: "N_upset",
    question: "I get upset easily.",
    category: "neuroticism",
  },
  {
    id: 16,
    identifier: "N_blue",
    question: "I seldom feel blue.",
    category: "neuroticism",
    reverse: true,
  },

  {
    id: 17,
    identifier: "O_imagination",
    question: "I have a vivid imagination.",
    category: "openness",
  },
  {
    id: 18,
    identifier: "O_not_abstract",
    question: "I am not interested in abstract ideas.",
    category: "openness",
    reverse: true,
  },
  {
    id: 19,
    identifier: "O_difficulty_abstract",
    question: "I have difficulty understanding abstract ideas.",
    category: "openness",
    reverse: true,
  },
  {
    id: 20,
    identifier: "O_poor_imagination",
    question: "I do not have a good imagination.",
    category: "openness",
    reverse: true,
  },
];

const feedbackQuestions = [
  {
    id: "f1",
    text: "The recommended study programs aligned with my actual interests.",
  },
  {
    id: "f2",
    text: "The recommendations reflected my working style and personality well.",
  },
  {
    id: "f3",
    text: "I understood why these particular programs were suggested to me.",
  },
  {
    id: "f4",
    text: "At least one of the recommended programs matched my personal or career goals.",
  },
  {
    id: "f5",
    text: "The system correctly interpreted my personality profile.",
  },
  {
    id: "f6",
    text: "I would trust this system to support real educational decisions.",
  },
  { id: "f7", text: "I would recommend this tool to other students." },
];

export default function Quiz() {
  const [currentPage, setCurrentPage] = useState(1);
  const [formValues, setFormValues] = useState({});
  const [feedbackValues, setFeedbackValues] = useState({});
  const [openFeedback, setOpenFeedback] = useState({
    whyWrong: "",
    expected: "",
    changeSuggestion: "",
  });
  const [results, setResults] = useState(null);

  const itemsPerPage = 5;
  const orderedQuestions = [...questions];
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedQuestions = orderedQuestions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: parseInt(value),
    }));
  };

  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedbackValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenFeedbackChange = (e) => {
    const { name, value } = e.target;
    setOpenFeedback((prev) => ({ ...prev, [name]: value }));
  };

  const reverseScore = (value) => 6 - value;

  const handleSubmit = async () => {
    const answers = {};
    questions.forEach((q) => {
      const raw = parseInt(formValues[`question${q.id}`]);
      if (!isNaN(raw)) {
        answers[q.identifier] = q.reverse ? reverseScore(raw) : raw;
      }
    });

    try {
      const res = await fetch(
        "http://localhost:8000/matching/course-recommendations/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers }),
        }
      );
      const data = await res.json();
      setResults(data.recommended_courses);
    } catch (err) {
      console.error("❌ Błąd przy wysyłaniu danych:", err);
    }
  };

  const handleFeedbackSubmit = async () => {
    const payload = {
      ratings: feedbackValues,
      why_wrong: openFeedback.whyWrong,
      expected: openFeedback.expected,
      change_suggestion: openFeedback.changeSuggestion,
    };

    try {
      const res = await fetch(
        "http://localhost:8000/matching/submit-feedback/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (res.ok) {
        alert("🎉 Feedback został wysłany! Dzięki!");
      } else {
        alert("❌ Coś poszło nie tak przy wysyłaniu opinii.");
      }
    } catch (err) {
      console.error("❌ Błąd wysyłania feedbacku:", err);
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        Dopasuj kierunek studiów do swojej osobowości
      </h1>
      {paginatedQuestions.map((q) => {
        const name = `question${q.id}`;
        const isAnswered = formValues[name] !== undefined;

        return (
          <div key={q.id} className="mb-8">
            <h2 className="text-lg font-medium mb-3">{q.question}</h2>
            <input
              type="range"
              min="1"
              max="5"
              step="1"
              value={formValues[name] || 3}
              name={name}
              onChange={handleInputChange}
              className={`w-full h-3 rounded-full cursor-pointer transition-all duration-300 ${
                isAnswered ? "accent-blue-600" : "accent-gray-400 opacity-50"
              }`}
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
              <span>1 – Strongly disagree</span>
              <span>3 – Neutral</span>
              <span>5 – Strongly agree</span>
            </div>
          </div>
        );
      })}

      <Pagination
        totalItems={questions.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <div className="text-center mt-8">
        <button
          onClick={handleSubmit}
          className={`py-3 px-6 rounded text-white font-semibold ${
            Object.keys(formValues).length === questions.length
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={Object.keys(formValues).length !== questions.length}
        >
          Zobacz dopasowania
        </button>
        {Object.keys(formValues).length !== questions.length && (
          <p className="text-sm mt-2 text-gray-500">
            Uzupełnij wszystkie odpowiedzi, by zobaczyć wynik
          </p>
        )}
      </div>

      {results && (
        <div className="mt-12">
          <h2 className="text-3xl font-bold mb-6 text-center">
            🎯 Twoje najlepiej dopasowane kierunki
          </h2>

          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
            {results.map((r, i) => (
              <div
                key={i}
                className="border rounded-xl p-5 shadow-md bg-white hover:shadow-lg transition duration-300"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-semibold">{r.course_name}</h3>
                  <span
                    className={`font-bold text-lg ${
                      r.score >= 15
                        ? "text-green-600"
                        : r.score >= 10
                        ? "text-blue-600"
                        : "text-gray-600"
                    }`}
                  >
                    {r.score} pkt
                  </span>
                </div>

                {r.alerts.length > 0 && (
                  <div className="mt-3 bg-yellow-50 border-l-4 border-yellow-400 p-3 text-sm text-yellow-700 rounded">
                    <p className="font-medium mb-1">⚠️ Rozbieżności:</p>
                    <ul className="list-disc ml-5 space-y-1">
                      {r.alerts.map((alert, idx) => (
                        <li key={idx}>{alert.message}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12">
            <h3 className="text-2xl font-semibold mb-4 text-center">
              📝 Twoja opinia
            </h3>
            {feedbackQuestions.map((q, i) => (
              <div key={q.id} className="mb-4">
                <p className="mb-1">{q.text}</p>
                <div className="flex gap-4">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <label key={val} className="flex items-center gap-1">
                      <input
                        type="radio"
                        name={q.id}
                        value={val}
                        checked={feedbackValues[q.id] == val}
                        onChange={handleFeedbackChange}
                      />
                      {val}
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <div className="mt-6 space-y-4">
              <div>
                <label className="block mb-1 font-medium">
                  Were any of the suggested programs completely off or
                  surprising to you? Why?
                </label>
                <textarea
                  name="whyWrong"
                  className="w-full border rounded p-2"
                  rows={3}
                  value={openFeedback.whyWrong}
                  onChange={handleOpenFeedbackChange}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  What kind of study program were you expecting instead?
                </label>
                <textarea
                  name="expected"
                  className="w-full border rounded p-2"
                  rows={3}
                  value={openFeedback.expected}
                  onChange={handleOpenFeedbackChange}
                />
              </div>

              <div>
                <label className="block mb-1 font-medium">
                  What would you change to make the recommendations more
                  accurate?
                </label>
                <textarea
                  name="changeSuggestion"
                  className="w-full border rounded p-2"
                  rows={3}
                  value={openFeedback.changeSuggestion}
                  onChange={handleOpenFeedbackChange}
                />
              </div>
              <div className="mt-6 text-center">
                <button
                  onClick={handleFeedbackSubmit}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded transition disabled:opacity-50"
                  disabled={
                    Object.keys(feedbackValues).length <
                      feedbackQuestions.length ||
                    !openFeedback.whyWrong ||
                    !openFeedback.expected ||
                    !openFeedback.changeSuggestion
                  }
                >
                  Wyślij opinię
                </button>
                <p className="text-sm text-gray-500 mt-2">
                  Dziękujemy za wypełnienie – Twoja opinia pomaga ulepszyć
                  system.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
