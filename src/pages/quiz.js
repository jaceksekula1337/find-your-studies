import { useState } from "react";

const questions = [
  {
    id: 1,
    question: "Czy lubisz pracować z ludźmi?",
    answers: ["Bardzo lubię", "Jest mi to obojętne", "Nie lubię"],
  },
  {
    id: 2,
    question: "Jak czujesz się podczas wystąpień publicznych?",
    answers: [
      "Bardzo dobrze, sprawia mi to przyjemność",
      "Nie jestem pewien/pewna, mam mieszane uczucia",
      "Zdecydowanie tego nie lubię, unikam za wszelką cenę",
    ],
  },
  {
    id: 3,
    question: "Czy uważasz się za osobę empatyczną?",
    answers: ["Zdecydowanie tak", "W pewnym stopniu", "Zdecydowanie nie"],
  },
  {
    id: 4,
    question:
      "Jak ważne jest dla Ciebie pomaganie innym ludziom w Twojej przyszłej pracy?",
    answers: [
      "Bardzo ważne, chciałbym/chciałabym, aby to był główny aspekt mojej pracy",
      "Nie ma to dla mnie większego znaczenia",
      "Nie ma to dla mnie większego znaczenia",
    ],
  },
  {
    id: 5,
    question: "Jak radzisz sobie z rozwiązywaniem problemów pod presją czasu?",
    answers: [
      "Bardzo dobrze, dobrze sobie radzę pod presją",
      "Średnio, czasem się stresuję",
      "Bardzo słabo, unikam takich sytuacji",
    ],
  },
];

export default function Quiz() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedQuestions = questions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-6 text-green-600 text-center">
            Odpowiedz na kilka pytań, które pozwolą nam ułatwić wskazanie
            kierunków, które mogą być dla Ciebie
          </h1>
        </div>
        <div className="flex justify-between mb-4">
          <div>
            <label className="block font-semibold mb-2">Interesują mnie</label>
            <div>
              <input
                type="radio"
                name="interest"
                id="interest1"
                className="mr-2"
              />
              <label htmlFor="interest1">Nauki społeczne i humanistyczne</label>
            </div>
            <div>
              <input
                type="radio"
                name="interest"
                id="interest2"
                className="mr-2"
              />
              <label htmlFor="interest2">Nauki ścisłe i techniczne</label>
            </div>
            <div>
              <input
                type="radio"
                name="interest"
                id="interest3"
                className="mr-2"
              />
              <label htmlFor="interest3">Nauki przyrodnicze i medyczne</label>
            </div>
            <div>
              <input
                type="radio"
                name="interest"
                id="interest4"
                className="mr-2"
              />
              <label htmlFor="interest4">Rozważam wszystko</label>
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Ja mogę studiować
            </label>
            <select className="border rounded p-2 w-full">
              <option>Wszystkie</option>
              <option>Stacjonarne</option>
              <option>Niestacjonarne</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Rozważam uczelnie i kierunki:
            </label>
            <div>
              <input type="radio" name="type" id="type1" className="mr-2" />
              <label htmlFor="type1">Publiczne</label>
            </div>
            <div>
              <input type="radio" name="type" id="type2" className="mr-2" />
              <label htmlFor="type2">Prywatne</label>
            </div>
            <div>
              <input type="radio" name="type" id="type3" className="mr-2" />
              <label htmlFor="type3">Dziennie</label>
            </div>
            <div>
              <input type="radio" name="type" id="type4" className="mr-2" />
              <label htmlFor="type4">Zaoczne</label>
            </div>
          </div>
        </div>
      </div>

      {paginatedQuestions.map((question) => (
        <div key={question.id} className="mb-4">
          <h2 className="text-xl font-semibold mb-2">{question.question}</h2>
          {question.answers.map((answer, index) => (
            <div key={index} className="mb-2">
              <input
                type="radio"
                name={`question${question.id}`}
                id={`q${question.id}a${index}`}
                className="mr-2"
              />
              <label htmlFor={`q${question.id}a${index}`}>{answer}</label>
            </div>
          ))}
        </div>
      ))}

      <div className="flex justify-center mt-8">
        <button
          className="mx-1"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ← Previous
        </button>
        {[...Array(Math.ceil(questions.length / itemsPerPage)).keys()].map(
          (page) => (
            <button
              key={page}
              className={`mx-1 ${currentPage === page + 1 ? "font-bold" : ""}`}
              onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </button>
          )
        )}
        <button
          className="mx-1"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(questions.length / itemsPerPage)}
        >
          Next →
        </button>
      </div>

      <div className="mt-8 text-center">
        <button className="bg-green-600 text-white py-2 px-4 rounded">
          Zobacz dopasowania [102]
        </button>
        <p className="mt-2 text-sm text-gray-500">
          Odpowiedz na więcej pytań, żeby dostać bardziej szczegółowe
          dopasowanie.
        </p>
      </div>
    </div>
  );
}
