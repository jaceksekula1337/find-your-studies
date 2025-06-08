import { useState, useRef, useEffect } from "react";
import Pagination from "../components/Pagination";

const questions = [
  {
    id: 1,
    identifier: "E_life_party",
    question: "Jestem duszą towarzystwa.",
    category: "extraversion",
  },
  {
    id: 2,
    identifier: "E_quiet",
    question: "Rzadko się odzywam.",
    category: "extraversion",
    reverse: true,
  },
  {
    id: 3,
    identifier: "E_talk_people",
    question: "Rozmawiam z wieloma osobami na imprezach.",
    category: "extraversion",
  },
  {
    id: 4,
    identifier: "E_background",
    question: "Trzymam się na uboczu.",
    category: "extraversion",
    reverse: true,
  },

  {
    id: 5,
    identifier: "A_sympathize",
    question: "Współczuję uczuciom innych osób.",
    category: "agreeableness",
  },
  {
    id: 6,
    identifier: "A_not_care",
    question: "Nie interesują mnie problemy innych ludzi.",
    category: "agreeableness",
    reverse: true,
  },
  {
    id: 7,
    identifier: "A_feel_emotions",
    question: "Odbieram emocje innych ludzi.",
    category: "agreeableness",
  },
  {
    id: 8,
    identifier: "A_not_interested",
    question: "Tak naprawdę nie interesuję się innymi.",
    category: "agreeableness",
    reverse: true,
  },

  {
    id: 9,
    identifier: "C_chores",
    question: "Od razu wykonuję swoje obowiązki.",
    category: "conscientiousness",
  },
  {
    id: 10,
    identifier: "C_forget_things",
    question: "Często zapominam odłożyć rzeczy na miejsce.",
    category: "conscientiousness",
    reverse: true,
  },
  {
    id: 11,
    identifier: "C_order",
    question: "Lubię porządek.",
    category: "conscientiousness",
  },
  {
    id: 12,
    identifier: "C_mess",
    question: "Robię bałagan.",
    category: "conscientiousness",
    reverse: true,
  },

  {
    id: 13,
    identifier: "N_mood_swings",
    question: "Mam częste wahania nastroju.",
    category: "neuroticism",
  },
  {
    id: 14,
    identifier: "N_relaxed",
    question: "Zazwyczaj jestem zrelaksowany/a.",
    category: "neuroticism",
    reverse: true,
  },
  {
    id: 15,
    identifier: "N_upset",
    question: "Łatwo się denerwuję.",
    category: "neuroticism",
  },
  {
    id: 16,
    identifier: "N_blue",
    question: "Rzadko mam obniżony nastrój.",
    category: "neuroticism",
    reverse: true,
  },

  {
    id: 17,
    identifier: "O_imagination",
    question: "Mam bujną wyobraźnię.",
    category: "openness",
  },
  {
    id: 18,
    identifier: "O_not_abstract",
    question: "Nie interesują mnie abstrakcyjne idee.",
    category: "openness",
    reverse: true,
  },
  {
    id: 19,
    identifier: "O_difficulty_abstract",
    question: "Mam trudności z rozumieniem pojęć abstrakcyjnych.",
    category: "openness",
    reverse: true,
  },
  {
    id: 20,
    identifier: "O_poor_imagination",
    question: "Nie mam dobrej wyobraźni.",
    category: "openness",
    reverse: true,
  },
];

const feedbackQuestions = [
  {
    id: "f1",
    text: "Proponowane kierunki studiów odpowiadają moim faktycznym zainteresowaniom.",
  },
  {
    id: "f2",
    text: "Rekomendacje dobrze oddają mój styl pracy i cechy osobowości.",
  },
  {
    id: "f3",
    text: "Zrozumiałem/am, dlaczego zaproponowano mi te konkretne kierunki.",
  },
  {
    id: "f4",
    text: "Przynajmniej jeden z proponowanych kierunków pasuje do moich celów osobistych lub zawodowych.",
  },
  {
    id: "f5",
    text: "Odkryłem/am nowe kierunki, których wcześniej nie brałem/am pod uwagę.",
  },
  {
    id: "f6",
    text: "Proponowane kierunki były mi znane jeszcze przed wypełnieniem testu.",
  },
  {
    id: "f7",
    text: "Rekomendacje pomogły mi dostrzec nowe możliwości, o których wcześniej nie myślałem/am.",
  },
];

export default function Quiz() {
  const [currentPage, setCurrentPage] = useState(1);
  const [formValues, setFormValues] = useState({});
  const [feedbackValues, setFeedbackValues] = useState({});
  const [traitDescriptions, setTraitDescriptions] = useState({});
  const [openFeedback, setOpenFeedback] = useState({
    whyWrong: "",
    expected: "",
    mostAccurate: "",
    changeSuggestion: "",
  });
  const [results, setResults] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [visitedPages, setVisitedPages] = useState(new Set());

  const resultsRef = useRef(null);
  const feedbackRef = useRef(null);
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

  const handleSubmit = async () => {
    const answers = {};
    questions.forEach((q) => {
      const raw = parseInt(formValues[`question${q.id}`]);
      if (!isNaN(raw)) {
        answers[q.identifier] = raw;
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
      setUserProfile(data.user_profile);
      setTraitDescriptions(data.trait_descriptions);
    } catch (err) {
      console.error("❌ Błąd przy wysyłaniu danych:", err);
    }
  };

  const handleFeedbackSubmit = async () => {
    const payload = {
      ratings: feedbackValues,
      why_wrong: openFeedback.whyWrong,
      expected: openFeedback.expected,
      most_accurate: openFeedback.mostAccurate,
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

  const traitLabels = {
    extraversion: "Ekstrawersja",
    agreeableness: "Ugodowość",
    conscientiousness: "Sumienność",
    neuroticism: "Neurotyczność",
    openness: "Otwartość",
  };

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
              {results.slice(0, 5).map((r, i) => (
                <div
                  key={`top-${i}`}
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

            <h2 className="text-3xl font-bold text-center text-[#fca5a5] mt-14 mb-6">
              ❌ Najmniej dopasowane kierunki
            </h2>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-6">
              {[...results]
                .sort((a, b) => a.score - b.score)
                .slice(0, 5)
                .map((r, i) => (
                  <div
                    key={`bottom-${i}`}
                    className="bg-[#3a2e2e] border border-red-500 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-semibold text-red-200">
                        {r.course_name}
                      </h3>
                      <span className="text-sm font-semibold text-red-400">
                        {r.score}% dopasowania
                      </span>
                    </div>
                    {r.alerts && r.alerts.length > 0 && (
                      <div className="mt-3 bg-red-100/10 border-l-4 border-red-400 p-3 text-sm text-red-200 rounded">
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

            <div className="mt-12 text-center">
              <button
                onClick={() => {
                  if (feedbackRef.current) {
                    const topOffset =
                      feedbackRef.current.getBoundingClientRect().top +
                      window.scrollY -
                      130;
                    window.scrollTo({ top: topOffset, behavior: "smooth" });
                  }
                }}
                className="bg-[#6e43c5] hover:bg-[#8756e0] text-white font-bold py-3 px-8 rounded-full transition"
              >
                Wypełnij ankietę!
              </button>
            </div>
            {userProfile && (
              <div className="mt-10 bg-[#1f1f2e] p-6 rounded-xl text-sm text-gray-300">
                <h4 className="text-lg font-semibold mb-4">
                  📊 Twój profil osobowości
                </h4>

                <div className="space-y-4">
                  {Object.entries(userProfile).map(([trait, value]) => (
                    <div
                      key={trait}
                      className="bg-[#2b2b3b] p-4 rounded-lg border border-[#3d3d4f]"
                    >
                      <p className="text-sm font-medium text-purple-200">
                        {traitLabels[trait] || trait}:{" "}
                        <span className="text-white">{value.toFixed(2)}</span>
                      </p>
                      {traitDescriptions?.[trait] && (
                        <p className="text-xs text-gray-400 mt-1">
                          {traitDescriptions[trait]}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="mt-16">
              <h3 className="text-2xl font-semibold text-center text-purple-200 mb-6">
                📝 Twoja opinia
              </h3>

              <div className="space-y-6" ref={feedbackRef}>
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

                {[
                  {
                    key: "whyWrong",
                    label:
                      "Czy któryś z proponowanych kierunków był nietrafiony lub zaskakujący? Dlaczego?",
                  },
                  {
                    key: "expected",
                    label:
                      "Jakiego rodzaju kierunku studiów się spodziewałeś/aś?",
                  },
                  {
                    key: "mostAccurate",
                    label:
                      "Który z zaproponowanych kierunków wydawał się najtrafniejszy? Dlaczego?",
                  },
                  {
                    key: "changeSuggestion",
                    label:
                      "Co mogłoby sprawić, że rekomendacje byłyby dla Ciebie bardziej użyteczne?",
                  },
                ].map(({ key, label }, idx) => (
                  <div key={idx}>
                    <label className="block mb-2 font-medium">{label}</label>
                    <textarea
                      name={key}
                      value={openFeedback[key] || ""}
                      onChange={handleOpenFeedbackChange}
                      rows={3}
                      className="w-full border border-gray-600 bg-[#1f1f2e] text-gray-100 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                ))}

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
