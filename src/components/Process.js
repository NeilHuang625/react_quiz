export default function Process({
  index,
  numQuestion,
  point,
  maxPoints,
  answer,
}) {
  return (
    <header className="progress">
      <progress max={numQuestion} value={index + Number(answer !== null)} />
      <p>
        Question: <strong>{index + 1}</strong> / <strong>{numQuestion}</strong>
      </p>
      <p>
        Points: {point} / {maxPoints}
      </p>
    </header>
  );
}
