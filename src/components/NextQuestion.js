import React from "react";
import { useQuiz } from "../contexts/QuizContext";

const NextQuestion = () => {
  const { dispatch, answer, index, numberOfQuestions } = useQuiz();
  if (answer === null) {
    return null;
  }
  if (index === numberOfQuestions - 1) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
  }
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      Next
    </button>
  );
};

export default NextQuestion;
