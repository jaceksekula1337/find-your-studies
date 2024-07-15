import Quiz from "../components/Quiz";

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <h1 className="text-3xl font-bold mb-4 text-green-600">
        Quiz Preferencji
      </h1>
      <Quiz />
    </div>
  );
}
