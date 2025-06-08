import { useState, useRef, useEffect } from "react";
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
  const [userProfile, setUserProfile] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [visitedPages, setVisitedPages] = useState(new Set());

  const resultsRef = useRef(null);
  const itemsPerPage = 2;
  const totalQuestions = questions.length;
  const answeredCount = Object.keys(formValues).length;
  const progress = Math.min((answeredCount / totalQuestions) * 100, 100);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedQuestions = questions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  useEffect(() => {
    if (results && resultsRef.current) {
      const yOffset = -100;
      const y =
        resultsRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }, [results]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => {
      const updated = { ...prev, [name]: parseInt(value) };

      const allAnswered = paginatedQuestions.every((q) =>
        updated.hasOwnProperty(`question${q.id}`)
      );

      const isLastPage = currentPage * itemsPerPage >= questions.length;
      const alreadyVisited = visitedPages.has(currentPage);

      if (allAnswered && !isLastPage && !alreadyVisited) {
        setTimeout(() => {
          setTransitioning(true);
          setTimeout(() => {
            setCurrentPage((prevPage) => {
              const newPage = prevPage + 1;
              setVisitedPages((prevSet) => new Set(prevSet).add(prevPage));
              setTransitioning(false);
              return newPage;
            });
          }, 300);
        }, 200);
      }

      return updated;
    });
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
      setUserProfile(data.user_profile); // <-- Zapisz profil
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
      user_answers: formValues,
      user_profile: userProfile,
      recommended_courses: results?.map((r) => r.course_name),
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
    <div className="min-h-screen w-full bg-gradient-to-br from-[#121212] via-[#3c2d5d] to-[#121212] text-gray-100 pt-24 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-12">
          Dopasuj kierunek studiów do swojej osobowości
        </h1>

        {/* Pasek postępu */}
        <div className="mb-6">
          <div className="h-4 w-full bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#9f6ee9] transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-right text-xs text-gray-400 mt-1">
            {answeredCount} / {totalQuestions} pytań
          </p>
        </div>

        {/* Pytania z animacją */}
        <div
          className={`space-y-10 transition-opacity duration-300 ${
            transitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          {paginatedQuestions.map((q) => {
            const name = `question${q.id}`;
            const currentValue = formValues[name];

            return (
              <div
                key={q.id}
                className="bg-[#2a2a3b] p-6 rounded-2xl shadow-sm border border-[#3d3d4f]"
              >
                <h2 className="text-lg font-semibold mb-4 text-gray-100">
                  {q.question}
                </h2>

                <div className="grid grid-cols-5 gap-4 px-4 py-2 bg-[#242434] rounded-xl text-center">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <label
                      key={`${q.id}-${val}`}
                      className="flex flex-col items-center text-sm cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={name}
                        value={val}
                        checked={currentValue === val}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div
                        className={`w-10 h-10 flex items-center justify-center rounded-full transition border-2 ${
                          currentValue === val
                            ? "bg-[#9f6ee9] text-white border-[#9f6ee9] shadow-md"
                            : "bg-[#1e1e2e] text-gray-300 border-gray-600 hover:border-purple-300"
                        }`}
                      >
                        {val}
                      </div>
                    </label>
                  ))}
                </div>

                <div className="mt-2 grid grid-cols-5 gap-4 text-xs text-gray-400 px-4 text-center">
                  <span>Zdecydowanie się nie zgadzam</span>
                  <span>Nie zgadzam się</span>
                  <span>Nie mam zdania</span>
                  <span>Zgadzam się</span>
                  <span>Zdecydowanie się zgadzam</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10">
          <Pagination
            totalItems={questions.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>

        <div className="text-center mt-8">
          <button
            onClick={handleSubmit}
            disabled={Object.keys(formValues).length !== questions.length}
            className={`py-4 px-10 text-lg font-bold rounded-full transition duration-300 shadow-md disabled:opacity-40 disabled:cursor-not-allowed ${
              Object.keys(formValues).length === questions.length
                ? "bg-[#9f6ee9] text-white hover:bg-purple-500"
                : "bg-gray-700 text-gray-400"
            }`}
          >
            Zobacz dopasowania
          </button>
        </div>
        {results && (
          <div className="mt-16" ref={resultsRef}>
            <h2 className="text-3xl font-bold text-center text-[#d1bafc] mb-8">
              🎯 Twoje najlepiej dopasowane kierunki
            </h2>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
              {results.map((r, i) => (
                <div
                  key={i}
                  className="bg-[#2e2e40] border border-purple-500 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-purple-200">
                      {r.course_name}
                    </h3>
                    <span className="text-sm font-semibold text-green-400">
                      {r.score}% dopasowania
                    </span>
                  </div>

                  {r.alerts && r.alerts.length > 0 && (
                    <div className="mt-3 bg-yellow-100/10 border-l-4 border-yellow-400 p-3 text-sm text-yellow-200 rounded">
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
            {userProfile && (
              <div className="mt-10 bg-[#1f1f2e] p-6 rounded-xl text-sm text-gray-300">
                <h4 className="text-lg font-semibold mb-2">
                  📊 Twój profil osobowości
                </h4>
                <ul className="space-y-1">
                  {Object.entries(userProfile).map(([trait, value]) => (
                    <li key={trait}>
                      <strong>{trait}:</strong> {value.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-16">
              <h3 className="text-2xl font-semibold text-center text-purple-200 mb-6">
                📝 Twoja opinia
              </h3>

              <div className="space-y-6">
                {feedbackQuestions.map((q) => (
                  <div
                    key={q.id}
                    className="bg-[#2a2a3b] rounded-xl p-4 shadow-sm border border-[#3d3d4f]"
                  >
                    <p className="mb-2">{q.text}</p>
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

                {["whyWrong", "expected", "changeSuggestion"].map(
                  (key, idx) => (
                    <div key={idx}>
                      <label className="block mb-2 font-medium">
                        {key === "whyWrong"
                          ? "Czy któryś z kierunków był nietrafiony? Dlaczego?"
                          : key === "expected"
                          ? "Czego się spodziewałeś zamiast tego?"
                          : "Jak można by lepiej dopasować propozycje?"}
                      </label>
                      <textarea
                        name={key}
                        value={openFeedback[key]}
                        onChange={handleOpenFeedbackChange}
                        rows={3}
                        className="w-full border border-gray-600 bg-[#1f1f2e] text-gray-100 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      />
                    </div>
                  )
                )}

                <div className="text-center mt-8">
                  <button
                    onClick={handleFeedbackSubmit}
                    disabled={
                      Object.keys(feedbackValues).length <
                        feedbackQuestions.length ||
                      !openFeedback.whyWrong ||
                      !openFeedback.expected ||
                      !openFeedback.changeSuggestion
                    }
                    className="bg-[#9f6ee9] hover:bg-purple-500 text-white font-bold py-3 px-8 rounded-full transition disabled:opacity-30"
                  >
                    Wyślij opinię
                  </button>
                  <p className="text-sm text-gray-400 mt-2">
                    Dziękujemy! Twoja opinia pomaga ulepszyć nasz system.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
