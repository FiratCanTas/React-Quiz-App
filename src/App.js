import { useEffect, useReducer } from 'react';
import Header from './Header';
import Main from './Main';
import Loader from './Loader';
import Error from './Error';

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
        {status === "ready" && <Loader />}
      </Main>
    </div>
  );
}

export default App;
