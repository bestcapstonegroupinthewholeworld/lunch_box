import React, { useState, useEffect } from "react";

export default function CountdownClock() {
  //   const [secondsElapsed, setSecondsElapsed] = useState(600000);
  const [count, setCount] = useState(599);
  const [min, setMin] = useState(10);
  const [sec, setSec] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && count >= 0) {
      console.log(count);
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
    // let minDivisor = secs % (60 * 60);
    let minutes = Math.floor(secs / 60);
    // let secDivisor = minDivisor % 60;
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
    <div className="countDown_container">
      <h1 className="text" style={{ color: "black" }}>
        {/* <span className="countDownMin">{secondsElapsed}</span>
        <span className="countDownColon">:</span>
        <span className="countDownSec">{secondsElapsed}</span> */}
        {min <= 9 ? "0" + min : min} : {sec <= 9 ? "0" + sec : sec}
      </h1>

      {/* ========================== pause button ============================  */}
      <div className="countDownFrame">
        <button
          className="countDownBtn"
          onClick={() => {
            setIsActive(false);
          }}
        >
          <i className="material-icons-round">pause</i>
        </button>
        {/* ========================== play button ============================  */}
        <button
          className="countDownBtn"
          onClick={() => {
            setIsActive(true);
          }}
        >
          <i className="material-icons-round">play_arrow</i>
        </button>
        {/* ========================== reset button ============================  */}
        <button
          className="countDownBtn"
          onClick={() => {
            setIsActive(false);
            setCount(599);
            setMin(10);
            setSec(0);
          }}
        >
          <i className="material-icons-round">replay</i>
        </button>
      </div>
    </div>
  );
}
