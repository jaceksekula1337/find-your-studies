import React, { useState } from "react";
import dynamic from 'next/dynamic';
const Wheel = dynamic(() => import('react-custom-roulette').then((mod) => mod.Wheel), { ssr: false });
import useCourses from "../hooks/useCourses";

const WheelPage = () => {
  const { courses, loading } = useCourses();
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState("");

  if (loading) {
    return <p>Ładowanie kursów...</p>;
  }

  // Zdefiniowane segmenty
  const segments = [
    { option: "Coś nudnego", style: { backgroundColor: "#FF5733" } },
    { option: "Dużo dziewczyn", style: { backgroundColor: "#33FF57" } },
    { option: "Dużo nauki", style: { backgroundColor: "#FFB833" } },
    { option: "Dużo pracy", style: { backgroundColor: "#3357FF" } },
    { option: "Świetna zabawa", style: { backgroundColor: "#8E44AD" } },
    { option: "Nowe doświadczenia", style: { backgroundColor: "#E67E22" } },
  ];

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * segments.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const handleSpinStop = () => {
    setMustSpin(false);
    const randomCourse = courses[Math.floor(Math.random() * courses.length)];
    setSelectedCourse(randomCourse.courseName);
    console.log("Wylosowany kurs:", randomCourse.courseName);
  };

  return (
    <div className="p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4 text-purple-600">Koło Fortuny</h1>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={segments}
        onStopSpinning={handleSpinStop}
      />
      <button
        onClick={handleSpinClick}
        className="mt-4 bg-purple-600 text-white py-2 px-4 rounded"
      >
        Zakręć
      </button>
      <p className="mt-4 text-xl">
        Wylosowany kierunek: {mustSpin ? "..." : selectedCourse}
      </p>
    </div>
  );
};

export default WheelPage;
