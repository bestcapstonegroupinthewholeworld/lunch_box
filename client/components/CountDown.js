import React from "react";
import { useTimer } from "react-timer-hook";

function Timer({ expiryTimestamp }) {
  const {
    seconds,
    minutes,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <div className="countDown_container">
      <div className="text">
        <span className="countDownMin">{minutes}</span>
        <span className="countDownColon">:</span>
        <span className="countDownSec">{seconds}</span>
      </div>

      <div className="text-reflect">
        <span className="countDownMin">{minutes}</span>
        <span className="countDownColon">:</span>
        <span className="countDownSec">{seconds}</span>
      </div>

      {/* <p className="countDownStatus">{isRunning ? "Running" : "Not running"}</p> */}
      <div className="countDownFrame">
        <button className="countDownBtn" onClick={pause}>
          <i className="material-icons-round">pause</i>
        </button>
        {/* <button className="countDownBtn3" onClick={resume}>
          resume
        </button> */}
        <button className="countDownBtn" onClick={start}>
          <i className="material-icons-round">play_arrow</i>
        </button>
        <button
          className="countDownBtn"
          onClick={() => {
            const time = new Date();
            time.setSeconds(time.getSeconds() + 600);
            restart(time);
          }}
        >
          <i className="material-icons-round">replay</i>
        </button>
      </div>
    </div>
  );
}

export default function CountdownClock() {
  const time = new Date();
  time.setSeconds(time.getSeconds() + 600);
  return (
    <div>
      <Timer expiryTimestamp={time} />
    </div>
  );
}
