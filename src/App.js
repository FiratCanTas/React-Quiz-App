import { useEffect, useMemo, useReducer } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading",
  index: 0
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'dataReceived':
      return{
        ...state,
        questions: action.payload,
        status: "ready"
      }
    case 'dataFailed':
      return{
        ...state,
        status: "error"
      }
    case 'start':
      return{
        ...state,
        status: "active"
      }

    default:
      throw new Error('Unknow action')
  }
}

function App() {
  const [{ questions, status, index }, dispatch] = useReducer(reducer, initialState)

  const numberOfQuestions = useMemo(()=> {
    return questions.length
  },[questions])
  
  useEffect(()=> {
    fetch("http://localhost:8000/questions")
      .then(res => res.json())
      .then(data => dispatch({ type: "dataReceived", payload: data }))
      .catch(error => dispatch({ type: "dataFailed" }))
  },[])

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numberOfQuestions={numberOfQuestions} dispatch={dispatch} />}
        {status === "active" && <Question question={questions[index]} />}
      </Main>
    </div>
  );
}

export default App;
