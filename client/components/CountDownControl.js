import React from "react";

export default function CountDownControl(props) {
  const { setCount, setMin, setSec, setIsActive } = props;

  return (
    <div className="countDownFrame">
      {/* ========================== pause button ============================  */}
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
  );
}
