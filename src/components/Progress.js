import React from "react";
import { useQuiz } from "../contexts/QuizContext";

const Progress = () => {
  const { index, numberOfQuestions, points, totalPoints } = useQuiz();
  return (
    <header className="progress">
      <progress max={numberOfQuestions} value={index} />
      <p>
        Question {index + 1} / {numberOfQuestions}
      </p>
      <p>
        {points} / {totalPoints}
      </p>
    </header>
  );
};

export default Progress;
