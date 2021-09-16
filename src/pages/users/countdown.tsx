import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Router, { useRouter } from "next/router";
import router from "next/router";

const renderTime = ({ remainingTime }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const currentTime = useRef(remainingTime);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const prevTime = useRef(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isNewTimeFirstTick = useRef(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [, setOneLastRerender] = useState(0);

  if (currentTime.current !== remainingTime) {
    isNewTimeFirstTick.current = true;
    prevTime.current = currentTime.current;
    currentTime.current = remainingTime;
  } else {
    isNewTimeFirstTick.current = false;
  }

  if (remainingTime === 0) {
    Router.push({
      pathname: "/users/play",
      query: {
        language: router.query["language"],
        level: router.query["level"],
        count: 1,
      },
    });
  }

  const isTimeUp = isNewTimeFirstTick.current;

  return (
    <div className="time-wrapper">
      <div key={remainingTime} className={`time ${isTimeUp ? "up" : ""}`}>
        {remainingTime}
      </div>
      {prevTime.current !== null && (
        <div
          key={prevTime.current}
          className={`time ${!isTimeUp ? "down" : ""}`}
        >
          {prevTime.current}
        </div>
      )}
    </div>
  );
};

const countdown = () => {
  return (
    <div className="App">
      <p className="font-bold text-2xl text-center py-24">ゲーム開始まで</p>
      <div className="timer-wrapper">
        <CountdownCircleTimer
          isPlaying
          duration={3}
          colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
    </div>
  );
};

export default countdown;
