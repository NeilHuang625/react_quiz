export default function Option({ question, dispatch, answer }) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${
            hasAnswered ? (answer === index ? "answer" : "") : ""
          } ${
            hasAnswered
              ? question.correctOption === index
                ? "correct"
                : "wrong"
              : ""
          }`}
          key={option}
          onClick={() => {
            dispatch({ type: "answer", payload: index });
          }}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
