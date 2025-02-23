import React from "react";
import { FlipWords } from "./ui/flip-words";

export function FlipWordsDemo() {
  const words = [
    "Transforming Teacher Development Through AI",
    "Real-time Feedback & Performance Tracking",
    "Personalized Professional Growth Pathways",
    "Data-Driven Classroom Implementation",
    "Empowering Educators for Better Student Outcomes"
  ];

  return (
    <div className="h-[20rem] flex flex-col justify-center items-center px-4 bg-gradient-to-r from-cream-100 to-cream-200 dark:from-gray-900 dark:to-gray-800">
      <div className="text-3xl md:text-4xl font-light text-gray-800 dark:text-gray-100 text-center max-w-4xl">
        <FlipWords words={words} /> 
      </div>
      <p className="mt-6 text-gray-600 dark:text-gray-300 text-center max-w-2xl">
        Bridging the gap between training and classroom impact with intelligent monitoring and support
      </p>
    </div>
  );
}
