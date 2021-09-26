import React, { useState, useEffect } from 'react';
import CountDownControl from './CountDownControl';

export default function CountdownClock({ isActive, setIsActive, currentCard }) {
  //   const [secondsElapsed, setSecondsElapsed] = useState(600000);
  const [count, setCount] = useState(59);
  const [min, setMin] = useState(1);
  const [sec, setSec] = useState(0);
  //   const [isActive, setIsActive] = useState(false);
  if (currentCard) setIsActive(true);
  else setIsActive(false);

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
      'http://cd.textfiles.com/maxsounds/WAV/EFEITOS/ALARME.WAV'
    );
    buzzer.volume = 0.5;
    buzzer.play();
  };

  return (
    <div className="countDown_container">
      <h1 className="text">
        <span className="countDownMin">{min <= 9 ? '0' + min : min}</span>
        <span className="countDownColon">:</span>
        <span className="countDownSec">{sec <= 9 ? '0' + sec : sec}</span>
      </h1>
      {/* <CountDownControl
        setIsActive={setIsActive}
        setCount={setCount}
        setMin={setMin}
        setSec={setSec}
      /> */}
    </div>
  );
}
