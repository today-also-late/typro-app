import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import Router, { useRouter } from "next/router";
import router from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  emptyQuestions,
  updateQuestionsState,
} from "../../../redux/slices/questionsSlice";
import { emptyAnswers } from "../../../redux/slices/answersSlice";

const renderTime = ({ remainingTime }: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const currentTime = useRef(remainingTime);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const prevTime = useRef(null);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isNewTimeFirstTick = useRef(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [, setOneLastRerender] = useState(0);

  const language: string | string[] | undefined = router.query["language"];
  const level: string | string[] | undefined = router.query["level"];

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
        language: language,
        level: level,
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

const CountDown = () => {
  const dispatch = useDispatch();

  const language: string | string[] | undefined = router.query["language"];
  const level: string | string[] | undefined = router.query["level"];

  const selected: any = { language: language, level: level };

  useEffect(() => {
    dispatch(emptyAnswers()); // 問題が開始する前に前回の回答を消す
    dispatch(emptyQuestions());
    // ソロプレイのときにdbからstateにquestionを反映させる
    dispatch(updateQuestionsState(selected)); // dbからquestionをとってくる
  }, []);

  return (
    <div className="App">
      <p className="font-bold text-2xl text-center py-24">ゲーム開始まで</p>
      <div className="timer-wrapper">
        <CountdownCircleTimer
          isPlaying
          duration={3}
          colors={[
            ["#004777", 0.33],
            ["#F7B801", 0.33],
            ["#A30000", 0],
          ]}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
    </div>
  );
};

export default CountDown;
