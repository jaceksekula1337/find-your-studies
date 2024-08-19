import React, { useState } from "react";
import dynamic from 'next/dynamic';
const Wheel = dynamic(() => import('react-custom-roulette').then((mod) => mod.Wheel), { ssr: false, });
import useCourses from "../hooks/useCourses";

const WheelPage = () => {
  const { courses, loading } = useCourses();
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  if (loading) {
    return <p>Ładowanie kursów...</p>;
  }

  const segments = courses.slice(0, 6).map((course, index) => ({
    option: course.courseName,
    style: { backgroundColor: index % 2 === 0 ? "#FF5733" : "#33FF57" },
  }));

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * segments.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };
  const data1 = [
    { option: "0", style: { backgroundColor: "green", textColor: "black" } },
    { option: "1", style: { backgroundColor: "white" } },
    { option: "2" },
  ];
  return (
    <div className="p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-4 text-purple-600">Koło Fortuny</h1>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={segments}
        onStopSpinning={() => {
          setMustSpin(false);
          console.log("Wylosowany kurs:", segments[prizeNumber].option);
        }}
      />
      <button
        onClick={handleSpinClick}
        className="mt-4 bg-purple-600 text-white py-2 px-4 rounded"
      >
        Zakręć
      </button>
      <p className="mt-4 text-xl">
        Wylosowany kierunek: {mustSpin ? "..." : segments[prizeNumber].option}
      </p>
    </div>
  );
};

export default WheelPage;
