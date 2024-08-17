import Quiz from "../components/Quiz";

export default function QuizPage() {
  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-green-600 text-center">
        Odpowiedz na kilka pytań, które pozwolą nam ułatwić wskazanie kierunków,
        które mogą być dla Ciebie
      </h1>
      <Quiz />
    </div>
  );
}
