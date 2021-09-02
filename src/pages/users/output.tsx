import { useCallback } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextInput } from "../../components/atoms";
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
import CountdownBar from "../../components/atoms/CountDownBar";

const Play = () => {
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
  const settingAudio = () => {
    setAudioKeybord(new Audio(Keybord));
    setAudioDisplayQ(new Audio(DisplayQ2));
    setAudioMiss(new Audio(Miss));
    setAudioSuccess(new Audio(Success));
  };

  useEffect(() => {
    settingAudio();

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

  const displayNextQuestion = (nextQuestionId: number) => {
    setQuesiton(questions[Number(count)]["output"][nextQuestionId]);
    setCurrentId(nextQuestionId);
    if (
      nextQuestionId > Object.keys(questions[Number(count)]["output"]).length
    ) {
      if (Number(count) === 2) {
        console.log(answers);
        dispatch(addMissAnswers(missCount));
        performance.mark("question2:end");
        performance.mark("question:end");
        performance.measure("question", "question:start", "question:end");
        performance.measure("question1", "question1:start", "question1:end");
        performance.measure("question2", "question2:start", "question2:end");
        alert("おめでとうございます。クリアです。");
        Router.push({
          pathname: "/users/result",
          query: {
            language: language,
            level: level,
          },
        });
      } else {
        dispatch(addMissAnswers(missCount));
        performance.mark("question1:end");
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
      console.log(question);
      if (code === question) {
        audioSuccess?.play();
        if (Number(count) === 1) {
          dispatch(addFirstOutputAnswers(code));
        } else if (Number(count) === 2) {
          dispatch(addSecondOutputAnswers(code));
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

  return (
    <body className="w-screen h-screen ">
      <div className="pt-24 py-12 flex justify-center">
        <CountdownBar />
      </div>
      <div className="flex justify-center items-center">
        <div className="w-1/4  text-lg">
          {answers[Number(count)]["src"].length > 0 &&
            answers[Number(count)]["src"].map(
              (answer: string, index: number) => (
                <div className="ml-24" key={index}>
                  {index + 1} : {answer}
                </div>
              )
            )}
        </div>
        <div className="w-2/4">
          <h1 className="text-center font-mono text-2xl">
            {currentId + "の出力は?"}
          </h1>
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
          <div className="text-center text-red-500">{alertText}</div>
          <div className="text-center text-red-500">{"miss:" + missCount}</div>
        </div>
        <div className="w-1/4  text-lg">
          {answers[Number(count)]["output"].length > 0 &&
            answers[Number(count)]["output"].map(
              (answer: string, index: number) => (
                <div className="ml-24" key={index}>
                  {index + 1} : {answer}
                </div>
              )
            )}
        </div>
      </div>
    </body>
  );
};
export default Play;
