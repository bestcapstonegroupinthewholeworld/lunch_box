import React, { useContext, useState } from "react";

const TimeContext = React.createContext();
const TimeUpdateContext = React.createContext();

//custom hook
export function useTime() {
  return useContext(TimeContext);
}

export function useTimeUpdate() {
  return useContext(TimeUpdateContext);
}

export function TimeProvider({ children }) {
  const [roundTimeState, setRoundTimeState] = useState("60");
  const handleChangeRoundTime = (event) => {
    const selectedTime = event.target.value;
    setRoundTimeState(selectedTime);
    // console.log(selectedTime)
  };
  return (
    <TimeContext.Provider value={roundTimeState}>
      <TimeUpdateContext.Provider
        value={(event) => {
          handleChangeRoundTime(event);
        }}
      >
        {children}
      </TimeUpdateContext.Provider>
    </TimeContext.Provider>
  );
}
