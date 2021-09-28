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
  const [count, setCount] = useState(59);

  const handleChangeRoundTime = (event) => {
    const selectedTime = event.target.value;
    setCount(selectedTime);
  };
  return (
    <TimeContext.Provider value={count}>
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
