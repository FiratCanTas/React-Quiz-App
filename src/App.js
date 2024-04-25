import { useEffect, useMemo, useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";
import NextQuestion from "./components/NextQuestion";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";

const SECS_PER_QUESTION = 30

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highestScore: 0,
  remainingSeconds: null
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        remainingSeconds: state.questions.length * SECS_PER_QUESTION
      };
    case "newAnswer":
      const question = state.questions[state.index];

      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highestScore: state.highestScore >= state.points ? state.highestScore :  state.points
      }
    case "restart":
      return{
        ...initialState,
        status: "ready",
        questions: state.questions,
      }
    case "tick":
      return{
        ...state,
        remainingSeconds:  state.remainingSeconds -1,
        status: state.remainingSeconds === 0 ? "finished" : state.status
      }

    default:
      throw new Error("Unknow action");
  }
};

function App() {
  const [{ questions, status, index, answer, points, highestScore, remainingSeconds }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const numberOfQuestions = useMemo(() => {
    return questions.length;
  }, [questions]);

  const totalPoints = useMemo(()=> {
    const sum = questions.reduce((accumulator, question) => accumulator + question.points, 0)
    return sum
  },[questions])

  useEffect(() => {
    fetch("http://localhost:8000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((error) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            numberOfQuestions={numberOfQuestions}
            dispatch={dispatch}
          />
        )}
        {status === "active" && (
          <>
          <Progress index={index} numberOfQuestions={numberOfQuestions} points={points} totalPoints={totalPoints} />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer dispatch={dispatch} remainingSeconds={remainingSeconds} />
              <NextQuestion dispatch={dispatch} answer={answer}  index={index} numberOfQuestions={numberOfQuestions} />
            </Footer>
            
          </>
        )}
        {status === "finished" && (
          <FinishScreen points={points} totalPoints={totalPoints} highestScore={highestScore} dispatch={dispatch} />
        )}
      </Main>
    </div>
  );
}

export default App;
