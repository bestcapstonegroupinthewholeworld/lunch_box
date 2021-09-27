import React, { useContext, useState } from "react";

const TimeContext = React.createContext();
const TimeUpdateContext = React.createContext();

//custom hook
export function useTime() {
  console.log(TimeContext, "========================");
  return useContext(TimeContext);
}

export function useTimeUpdate() {
  return useContext(TimeUpdateContext);
}

export function TimeProvider({ children }) {
  //   const [roundTimeState, setRoundTimeState] = useState("60");
  const [count, setCount] = useState(59);
  //   const [min, setMin] = useState(1);
  //   const [sec, setSec] = useState(0);

  //   const providerValue = {
  //     count,
  //     min,
  //     sec,
  //   };

  const handleChangeRoundTime = (event) => {
    const selectedTime = event.target.value;
    setCount(selectedTime);
    // console.log(selectedTime)
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
