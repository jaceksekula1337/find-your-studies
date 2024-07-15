import WheelOfFortune from '../components/WheelOfFortune';

export default function Wheel() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
      <h1 className="text-3xl font-bold mb-4 text-purple-600">Koło Fortuny</h1>
      <WheelOfFortune />
    </div>
  );
}
