export default function FinishScreen({
  point,
  maxPoints,
  highScore,
  dispatch,
}) {
  const correctRate = Math.round((point / maxPoints) * 100);
  let emoji;
  if (correctRate === 0) {
    emoji = "🤦";
  }
  if (correctRate === 100) {
    emoji = "🏅";
  }
  if (correctRate < 100 && correctRate >= 80) {
    emoji = "👍";
  }
  if (correctRate < 80 && correctRate >= 60) {
    emoji = "💪";
  }
  if (correctRate < 60 && correctRate > 0) {
    emoji = "🙃";
  }

  return (
    <>
      <p className="result">
        {emoji} You got {point} out of {maxPoints} ({correctRate}%)
      </p>
      <p className="highscore">(Highest Score: {highScore})</p>
      <button
        onClick={() => dispatch({ type: "restart" })}
        className="btn btn-ui"
      >
        Restart
      </button>
    </>
  );
}
