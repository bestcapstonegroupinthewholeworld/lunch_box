import React, { useState, useEffect } from "react";
import { useTime, useTimeUpdate } from "./TimeContext";
import { TimeProvider } from "./TimeContext";
import CountDownControl from "./CountDownControl";

export default function CountdownClock({
  count,
  setCount,
  isActive,
  setIsActive,
  currentCard,
  min,
  setMin,
  sec,
  setSec,
}) {
  // const count = Number(useTime());
  // const [count, setCount] = useState(Number(useTime()));
  console.log("inside countDown clock ~~~~~~~~~~", isActive);
  // const [min, setMin] = useState(Math.floor((count + 1) / 60));
  // const [sec, setSec] = useState((count + 1) % 60);

  const handlechangeRoundTime = useTimeUpdate();

  if (currentCard) setIsActive(true);
  // else setIsActive(false);

  useEffect(() => {
    let interval = null;
    if (isActive && count >= 0) {
      interval = setInterval(() => {
        setCount(count - 1);
        let timeLeft = secondsToTime(count);
        setMin(timeLeft.m);
        setSec(timeLeft.s);
      }, 1000);
      if (count === 0) {
        playAudio();
      }
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, count]);

  function secondsToTime(secs) {
    let minutes = Math.floor(secs / 60);

    let seconds = secs - minutes * 60;
    return {
      m: minutes,
      s: seconds,
    };
  }

  const playAudio = () => {
    const buzzer = new Audio(
      "http://cd.textfiles.com/maxsounds/WAV/EFEITOS/ALARME.WAV"
    );
    buzzer.volume = 0.5;
    buzzer.play();
  };

  return (
    <TimeProvider>
      <div className="countDown_container">
        <h1 className="countDown_text">
          <span>{min <= 9 ? "0" + min : min}</span>
          <span>:</span>
          <span>{sec <= 9 ? "0" + sec : sec}</span>
        </h1>
        {/* <CountDownControl
          setIsActive={setIsActive}
          setCount={count}
          setMin={setMin}
          setSec={setSec}
        /> */}
      </div>
    </TimeProvider>
  );
}
