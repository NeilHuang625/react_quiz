import { useReducer, useState } from "react";

const initialState = { count: 0, step: 1 };

function reducer(state, action) {
  switch (action.type) {
    case "inc": {
      return { ...state, count: state.count + state.step };
    }
    case "dec": {
      return { ...state, count: state.count - state.step };
    }
    case "defineCount": {
      return { ...state, count: action.count };
    }
    case "setStep": {
      return { ...state, step: action.step };
    }
    case "reset": {
      return initialState;
    }
    default: {
      throw new Error("unknow action type" + action.type);
    }
  }
}

function DateCounter() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // if you want to use count, step, destructure them from initialState as blow.
  // const {count, step} = initialState;

  // This mutates the date object.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + state.count);

  const dec = function () {
    dispatch({
      type: "dec",
      decreaseBy: 1,
    });
  };

  const inc = function () {
    dispatch({
      type: "inc",
      increaseBy: 1,
    });
  };

  const defineCount = function (e) {
    dispatch({
      type: "defineCount",
      count: Number(e.target.value),
    });
  };

  const defineStep = function (e) {
    dispatch({
      type: "setStep",
      step: Number(e.target.value),
    });
  };

  const reset = function () {
    dispatch({
      type: "reset",
    });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={state.step}
          onChange={defineStep}
        />
        <span>{state.step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={state.count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
