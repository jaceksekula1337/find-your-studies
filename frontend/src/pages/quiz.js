import { useState } from "react";
import Pagination from "../components/Pagination";
import FormInput from "../components/FormInput"; // Importujemy komponent FormInput

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
  const itemsPerPage = 5;
  const [formValues, setFormValues] = useState({
    interest: "",
    studyMode: "Wszystko",
    type: "",
  });

  const fetchQuizResults = async () => {
    const answers = {
      interest: formValues.interest,
      studyMode: formValues.studyMode,
      type: formValues.type,
      questions: questions.map((question) => ({
        id: question.id,
        answer: formValues[`question${question.id}`] || "Nie odpowiedziano",
      })),
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/matching/course-recommendations/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(answers),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Dopasowania:", data);
      } else {
        console.error("Błąd w odpowiedzi z serwera:", response.status);
      }
    } catch (error) {
      console.error("Błąd podczas wysyłania danych:", error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedQuestions = questions.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <div className="py-8">
          <h1 className="text-5xl text-center">
            Odpowiedz na kilka pytań, które pozwolą nam ułatwić wskazanie
            kierunków, <br></br>które mogą być dla Ciebie
          </h1>
        </div>
        <div className="text-center">
          <button className="bg-green-600 text-white py-2 px-4 rounded">
            Rozpocznij
          </button>
          <p className="mt-2 text-sm text-gray-500 mb-6">
            Im więcej odpowiedzi, tym lepsze dopasowanie
          </p>
        </div>
        <div className="flex justify-between mb-4">
          <FormInput
            type="radio"
            label="Interesują mnie"
            name="interest"
            options={[
              { value: "humanities", label: "Nauki społeczne i humanistyczne" },
              { value: "science", label: "Nauki ścisłe i techniczne" },
              { value: "medicine", label: "Nauki przyrodnicze i medyczne" },
              { value: "everything", label: "Rozważam wszystko" },
            ]}
            value={formValues.interest}
            onChange={handleInputChange}
          />
          <FormInput
            type="select"
            label="Ja mogę studiować"
            name="studyMode"
            options={[
              { value: "Wszystkie", label: "Wszystko" },
              { value: "Stacjonarne", label: "Stacjonarne" },
              { value: "Niestacjonarne", label: "Niestacjonarne" },
            ]}
            value={formValues.studyMode}
            onChange={handleInputChange}
          />

          <FormInput
            type="radio"
            label="Rozważam uczelnie i kierunki:"
            name="type"
            options={[
              { value: "public", label: "Publiczne" },
              { value: "private", label: "Prywatne" },
              { value: "day", label: "Dziennie" },
              { value: "evening", label: "Zaoczne" },
            ]}
            value={formValues.type}
            onChange={handleInputChange}
          />
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
          className="bg-green-600 text-white py-2 px-4 rounded"
          onClick={fetchQuizResults}
        >
          Zobacz dopasowania
        </button>
        <p className="mt-2 text-sm text-gray-500">
          Odpowiedz na więcej pytań, żeby dostać bardziej szczegółowe
          dopasowanie.
        </p>
      </div>
    </div>
  );
}
