import { useCallback } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextInput, TimeUpCountDown } from "../../components/atoms";
import {
  addFirstOutputAnswers,
  addSecondOutputAnswers,
  addMissAnswers,
} from "../../../redux/slices/answersSlice";
import { useEffect } from "react";
import { getAnswers } from "../../../redux/slices/answersSlice";
import { getQuestions } from "../../../redux/slices/questionsSlice";
import Router, { useRouter } from "next/router";
import Keybord from "../../../public/audios/keybord.mp3";
import DisplayQ2 from "../../../public/audios/displayquestion2.mp3";
import Miss from "../../../public/audios/miss.mp3";
import Success from "../../../public/audios/success.mp3";
import ITyped from "../../firebase/ityped";

const Output = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const answers = useSelector(getAnswers).answers; // answers.srcとanswers.outputがある
  const questions = useSelector(getQuestions).questions;

  const language: string | string[] | undefined = router.query["language"];
  const level: string | string[] | undefined = router.query["level"];
  const count: string | string[] | undefined = router.query["count"];

  const [code, setCode] = useState("");
  const [question, setQuesiton] = useState("");
  const [currentId, setCurrentId] = useState(1);
  const [alertText, setAlertText] = useState("");
  const [missCount, setMissCount] = useState(0);

  const [audioKeybord, setAudioKeybord] = useState<HTMLAudioElement | null>(
    null
  );
  const [audioDisplayQ2, setAudioDisplayQ] = useState<HTMLAudioElement | null>(
    null
  );
  const [audioMiss, setAudioMiss] = useState<HTMLAudioElement | null>(null);
  const [audioSuccess, setAudioSuccess] = useState<HTMLAudioElement | null>(
    null
  );
  const [isEnd, setIsEnd] = useState(false);

  const settingAudio = () => {
    setAudioKeybord(new Audio(Keybord));
    setAudioDisplayQ(new Audio(DisplayQ2));
    setAudioMiss(new Audio(Miss));
    setAudioSuccess(new Audio(Success));
  };

  const InputCode = useCallback(
    (event) => {
      audioKeybord?.play();
      setAlertText("");
      if (event.target.value.match(/  /)) {
        event.target.value = event.target.value.replace(/  /g, " ");
      }
      setCode(event.target.value);
    },
    [setCode]
  );

  const displayNextQuestion = (nextQuestionId: number) => {
    setQuesiton(questions[Number(count)]["output"][nextQuestionId]);
    setCurrentId(nextQuestionId);
    if (
      nextQuestionId > Object.keys(questions[Number(count)]["output"]).length
    ) {
      if (Number(count) === 2) {
        dispatch(addMissAnswers(missCount));
        performance.mark("question2output:end");
        performance.mark("question:end");
        performance.measure("question", "question:start", "question:end");
        performance.measure(
          "question1src",
          "question1src:start",
          "question1src:end"
        );
        performance.measure(
          "question2src",
          "question2src:start",
          "question2src:end"
        );
        performance.measure(
          "question1output",
          "question1output:start",
          "question1output:end"
        );
        performance.measure(
          "question2output",
          "question2output:start",
          "question2output:end"
        );
        setIsEnd(true);
        setTimeout(
          () =>
            Router.push({
              pathname: "/users/result",
              query: {
                language: language,
                level: level,
              },
            }),
          2500
        );
      } else {
        dispatch(addMissAnswers(missCount));
        performance.mark("question1output:end");
        Router.push({
          pathname: "/users/play",
          query: {
            language: language,
            level: level,
            count: Number(count) + 1,
          },
        });
      }
    }
  };

  const Judge = (e: any, code: string) => {
    if (e.key === "Enter") {
      if (code.match(/'/)) {
        code = code.replace(/'/g, '"');
      }
      if (code === question) {
        audioSuccess?.play();
        if (Number(count) === 1) {
          dispatch(addFirstOutputAnswers(question));
        } else if (Number(count) === 2) {
          dispatch(addSecondOutputAnswers(question));
        }
        setCode("");
        setAlertText("正解です。");
        let nextQuestionId = currentId + 1;
        displayNextQuestion(nextQuestionId);
      } else {
        audioMiss?.play();
        setMissCount((prevState) => prevState + 1);
        setAlertText("コードが違います。");
      }
    }
  };

  useEffect(() => {
    settingAudio();

    if (Number(count) === 1) {
      performance.mark("question1output:start");
    }

    if (Number(count) === 2) {
      performance.mark("question2output:start");
    }

    displayNextQuestion(currentId);

    // リロード,タブを閉じるときに警告(禁止はできない)
    window.addEventListener("beforeunload", onUnload);
    return () => {
      // イベントの設定解除
      window.removeEventListener("beforeunload", onUnload);
    };
  }, []);

  const onUnload = (e: any) => {
    e.preventDefault();
    e.returnValue = "";
  };

  if (!isEnd) {
    return (
      <body className="w-screen h-screen ">
        <div className="h-1/3 pt-24 flex justify-center">
          <div className="w-1/4 h-screen text-lg">
            {answers[Number(count)]["output"].length > 0 &&
              answers[Number(count)]["output"].map(
                (answer: string, index: number) => (
                  <pre className="ml-24" key={index}>
                    {index + 1} : {answer}
                  </pre>
                )
              )}
          </div>
          <div className="w-1/2 flex justify-center">
            <TimeUpCountDown question={questions[Number(count)]["timelimit"]} />
          </div>
          <div className="w-1/4 h-screen text-lg">
            {answers[Number(count)]["src"].length > 0 &&
              answers[Number(count)]["src"].map(
                (answer: string, index: number) => (
                  <pre className="ml-6" key={index}>
                    {index + 1} : {answer}
                  </pre>
                )
              )}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-2/4 text-center">
            <h1 className="text-center font-mono text-2xl user-select-none ">
              {"出力は?"}
            </h1>
            <div className="flex justify-center items-center">
              <div className="w-1/6" />
              <div className="w-2/3">
                <TextInput
                  fullWidth={true}
                  autoFocus={true}
                  margin="dense"
                  multiline={false}
                  required={true}
                  rows={1}
                  value={code}
                  type={"text"}
                  variant={"outlined"}
                  onChange={InputCode}
                  onKeyDown={(e) => Judge(e, code)}
                />
              </div>
              <div className="w-1/6" />
            </div>
            <div className="text-center text-red-500">{alertText}</div>
            <div className="text-center text-red-500">
              {"miss:" + missCount}
            </div>
          </div>
        </div>
      </body>
    );
  } else {
    return (
      <div className="w-screen h-screen ">
        <div className="h-1/6 text-center text-5xl pt-48">
          <ITyped strings={["クリアおめでとう!!"]} />
        </div>
      </div>
    );
  }
};
export default Output;
