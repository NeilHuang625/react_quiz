import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Process from "./Process";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  point: 0,
  highScore: 0,
  secondRemaining: null,
};

const Second_Per_Question = 30;

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived": {
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    }
    case "dataFailed": {
      return { ...state, status: "failed" };
    }
    case "active": {
      return {
        ...state,
        // Caculate time needed to answer these questions.
        secondRemaining: state.questions.length * Second_Per_Question,
        status: "start",
      };
    }
    case "answer": {
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        point:
          action.payload === question.correctOption
            ? state.point + question.points
            : state.point,
      };
    }
    case "nextQuestion": {
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    }
    case "finish": {
      return {
        ...state,
        status: "finish",
        highScore:
          state.point > state.highScore ? state.point : state.highScore,
      };
    }
    case "restart": {
      return {
        ...state,
        status: "start",
        index: 0,
        answer: null,
        point: 0,
        secondRemaining: state.questions.length * Second_Per_Question
      };
    }
    case "countdown": {
      return {
        ...state,
        status: state.secondRemaining === 0 ? "finish": state.status,
        secondRemaining: state.secondRemaining - 1,
      };
    }
    default: {
      throw new Error("Action unknown!");
    }
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    index,
    answer,
    point,
    highScore,
    secondRemaining,
  } = state;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log('Fetching data...');
        const response = await fetch('https://raw.githubusercontent.com/NeilHuang625/react_quiz/main/data/questions.json');
        // console.log('Response:', response);
        const data = await response.json();
        // console.log('Data:', data);
        dispatch({ type: "dataReceived", payload: data })
      } catch (error) {
        // console.error('Error fetching data:', error);
        dispatch({ type: "dataFailed" });
      }
    };
  
    fetchData();
  }, []);
  
  
  
  // useEffect(() => {
  //     fetch("https://raw.githubusercontent.com/NeilHuang625/react_quiz/main/data/questions.json")
  //     .then((res) => res.json())
  //     .then((data) => dispatch({ type: "dataReceived", payload: data }))
  //     .catch((err) => dispatch({ type: "dataFailed" }));
  // }, []);

  const numQuestion = questions.length;
  const maxPoints = questions.reduce((pre, cur) => pre + cur.points, 0);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "failed" && <Error />}
        {status === "finish" && (
          <FinishScreen
            point={point}
            maxPoints={maxPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
        {status === "ready" && (
          <StartScreen numQuestion={numQuestion} dispatch={dispatch} />
        )}
        {status === "start" && (
          <>
            <Process
              index={index}
              numQuestion={numQuestion}
              point={point}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              index = {index+1}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer secondRemaining={secondRemaining} dispatch={dispatch} />
              {answer !== null && (
                <NextButton
                  dispatch={dispatch}
                  numQusetion={numQuestion}
                  index={index}
                />
              )}
            </Footer>
          </>
        )}
      </Main>
    </div>
  );
}
