import { useEffect, useMemo, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';
import StartScreen from './StartScreen';

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: "loading"
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
  
    default:
      throw new Error('Unknow action')
  }
}

function App() {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState)

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
        {status === "ready" && <StartScreen numberOfQuestions={numberOfQuestions} />}
      </Main>
    </div>
  );
}

export default App;
