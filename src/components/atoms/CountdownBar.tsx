import React, { FunctionComponent, useState } from "react";
//@ts-ignore
import ProgressBar from "react-customizable-progressbar";
import moment, { Moment } from "moment";
import Timer from "./Timer";
import { useSelector } from "react-redux";
// import { getTimeLimit } from "../../../redux/slices/timelimitSlice";

type Props = {
  questionTimeLimit: number;
  outputTimeLimit: number;
};

const CountdownBar = (props: Props) => {
  // const totalSeconds: number = 31;
  const totalSeconds = props.questionTimeLimit;
  console.log("test", totalSeconds);

  const initialSeconds = 0;
  const initialProgress = (initialSeconds / totalSeconds) * 100;

  const getText = (date: Moment) => {
    const h = date.hour();
    const m = date.minute();

    if (h) return date.format("h[h] m[m] s[s]");
    else if (m) return date.format("m[m] s[s]");
    else return date.format("s[s]");
  };

  interface IndicatorProps {
    progress: number;
    elapsedSeconds: number;
  }

  const Indicator: FunctionComponent<IndicatorProps> = (props) => {
    const seconds = totalSeconds - props.elapsedSeconds - initialSeconds;
    const date = moment().startOf("day").seconds(seconds);

    return (
      <div className="flex items-center justify-center text-center absolute top-0 w-full h-full m-auto text-xl">
        <div>
          <div className={seconds > 0 ? "caption" : "caption big"}>
            時間切れです
          </div>
          <div className={seconds > 0 ? "time" : "time hidden"}>
            {getText(date)}
          </div>
        </div>
      </div>
    );
  };

  // const CountdownBar: FunctionComponent = () => {
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [progress, setProgress] = useState(initialProgress);

  const roundProgress = (progress: number) => {
    const factor = Math.pow(10, 2);
    return Math.round(progress * factor) / factor;
  };

  const handleTimer = (elapsedSeconds: number) => {
    const progress = roundProgress(
      ((elapsedSeconds + initialSeconds) / totalSeconds) * 100
    );

    setProgress(progress);
    setElapsedSeconds(elapsedSeconds);
  };
  // }

  return (
    <div className="item">
      <div className="flex justify-center">
        <ProgressBar
          radius={100}
          progress={progress}
          strokeWidth={3}
          strokeColor="indianred"
          trackStrokeWidth={3}
          trackStrokeColor="#e6e6e6"
          pointerRadius={5}
          pointerStrokeWidth={2}
          pointerStrokeColor="indianred"
        >
          <Indicator progress={progress} elapsedSeconds={elapsedSeconds} />
        </ProgressBar>

        <Timer
          initialSeconds={initialSeconds}
          totalSeconds={totalSeconds}
          onChange={handleTimer}
          interval={1000}
        />
      </div>
    </div>
  );
};

export default CountdownBar;
