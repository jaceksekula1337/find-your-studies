import React, { useState, useRef } from "react";

export default function WheelOfFortune({ courses }) {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const wheelRef = useRef(null);
  const totalDegrees = 360;
  const segmentDegrees = totalDegrees / 6;
  const segmentTexts = [
    "Coś ciekawego",
    "Dużo nauki",
    "Dużo dziewczyn",
    "Dużo pracy",
    "Świetna zabawa",
    "Nowe doświadczenia",
  ];

  const segmentColors = [
    "bg-red-500",
    "bg-yellow-500",
    "bg-green-500",
    "bg-blue-500",
    "bg-purple-500",
    "bg-pink-500",
  ];

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const randomCourse = Math.floor(Math.random() * courses.length);
    const randomSegment = Math.floor(Math.random() * 6);
    const additionalTurns = 5;
    const selectedAngle = randomSegment * segmentDegrees + additionalTurns * totalDegrees;

    wheelRef.current.style.transition = "transform 5s ease-out";
    wheelRef.current.style.transform = `rotate(${selectedAngle}deg)`;

    setTimeout(() => {
      setSelectedCourse(courses[randomCourse]);
      setIsSpinning(false);
    }, 5000);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div
          ref={wheelRef}
          className="wheel w-64 h-64 rounded-full border-4 border-gray-300 overflow-hidden relative"
        >
          {segmentTexts.map((text, index) => (
            <div
              key={index}
              className={`absolute w-full h-full flex justify-center items-center ${segmentColors[index]}`}
              style={{
                transform: `rotate(${index * segmentDegrees}deg)`,
                clipPath: `polygon(50% 50%, 100% 0, 100% 100%)`,
              }}
            >
              <span
                className="text-sm text-white"
                style={{
                  transform: `rotate(${segmentDegrees / 2}deg)`,
                }}
              >
                {text}
              </span>
            </div>
          ))}
        </div>
        <div className="wheel-pointer absolute top-0 left-1/2 transform -translate-x-1/2 text-red-500 text-lg">
          ▼
        </div>
      </div>
      <button
        className="mt-4 bg-purple-600 text-white py-2 px-4 rounded"
        onClick={spinWheel}
        disabled={isSpinning}
      >
        Zakręć
      </button>
      {selectedCourse && (
        <p className="mt-4 text-xl">
          Wylosowany kierunek: {selectedCourse.courseName}
        </p>
      )}
    </div>
  );
}
