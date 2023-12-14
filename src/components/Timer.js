import { useEffect } from "react";

export default function Timer({ secondRemaining, dispatch }) {
  // formatting the time like: 05:09
  const mins = Math.floor(secondRemaining/60)
  const seconds = secondRemaining%60
  useEffect(()=>{
    const id = setInterval(()=>{dispatch({type:"countdown"})},1000)
    return ()=>clearInterval(id)
  },[dispatch])

  return <div className="timer">{mins < 10 && 0}{mins}:{seconds < 10 && 0}{seconds}</div>;
}
