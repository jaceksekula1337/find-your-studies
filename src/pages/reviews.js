import Reviews from "../components/Reviews";

export default function ReviewsPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <h1 className="text-3xl font-bold mb-4 text-yellow-600">Opinie</h1>
      <Reviews />
    </div>
  );
}
