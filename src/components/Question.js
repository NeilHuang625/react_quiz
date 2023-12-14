import Option from "./Option";

export default function Question({ question, dispatch, answer, index }) {
  return (
    <div>
      <h4>{index}. {question.question}</h4>
      <Option question={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}
