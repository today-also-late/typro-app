import { useCallback } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextInput } from "../../components/atoms";
import {
  addFirstSrcAnswers,
  addSecondSrcAnswers,
  addMissAnswers,
} from "../../../redux/slices/answersSlice";
import { useEffect } from "react";
import { getAnswers } from "../../../redux/slices/answersSlice";
import {
  getQuestions,
  updateQuestionsState,
} from "../../../redux/slices/questionsSlice";
import Router, { useRouter } from "next/router";
import Keybord from "../../../public/audios/keybord.mp3";
import DisplayQ from "../../../public/audios/displayquestion1.mp3";
import Miss from "../../../public/audios/miss.mp3";
import Success from "../../../public/audios/success.mp3";
import CountdownBar from "../../components/atoms/CountdownBar";

const Play = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const answers = useSelector(getAnswers).answers;
  const questions = useSelector(getQuestions).questions;

  const language: any = router.query["language"];
  const level: any = router.query["level"];
  const count: any = router.query["count"];

  const selected = { language: language, level: level };

  const [code, setCode] = useState("");
  const [question, setQuestion] = useState("");
  const [currentId, setCurrentId] = useState(1);
  const [alertText, setAlertText] = useState("");
  const [missCount, setMissCount] = useState(0);

  const [audioKeybord, setAudioKeybord] = useState<HTMLAudioElement | null>(
    null
  );
  const [audioDisplayQ, setAudioDisplayQ] = useState<HTMLAudioElement | null>(
    null
  );
  const [audioMiss, setAudioMiss] = useState<HTMLAudioElement | null>(null);
  const [audioSuccess, setAudioSuccess] = useState<HTMLAudioElement | null>(
    null
  );

  const InputCode = useCallback(
    (event) => {
      audioKeybord?.play(); // 鳴らない
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
    setAudioDisplayQ(new Audio(DisplayQ));
    setAudioMiss(new Audio(Miss));
    setAudioSuccess(new Audio(Success));
  };

  useEffect(() => {
    settingAudio();

    if (Number(count) === 1) {
      dispatch(updateQuestionsState(selected)); // dbからquestionをとってくる
      performance.mark("question:start");
      performance.mark("question1:start");
    }

    if (Number(count) === 2) {
      performance.mark("question2:start");
    }

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

  useEffect(() => {
    audioDisplayQ?.play();
    displayNextQuestion(currentId);
  }, [questions]);

  const displayNextQuestion = (nextQuestionId: number) => {
    if (nextQuestionId > Object.keys(questions[Number(count)]["src"]).length) {
      dispatch(addMissAnswers(missCount));
      Router.push({
        pathname: "/users/output",
        query: {
          language: language,
          level: level,
          count: count,
        },
      });
    }
    setQuestion(questions[Number(count)]["src"][nextQuestionId]);
    setCurrentId(nextQuestionId);
  };

  const Judge = (e: any, code: string) => {
    if (e.key === "Enter") {
      if (code.match(/'/)) {
        code = code.replace(/'/g, '"');
      }
      if (code === question) {
        audioSuccess?.play();

        if (Number(count) === 1) {
          dispatch(addFirstSrcAnswers(code));
        } else if (Number(count) === 2) {
          dispatch(addSecondSrcAnswers(code));
        }
        setCode("");
        setAlertText("正解です。");
        let nextQuestionId = currentId + 1; // srcの次の問題
        displayNextQuestion(nextQuestionId);
      } else {
        audioMiss?.play();

        setMissCount((prevState) => prevState + 1);
        setAlertText("コードが違います。");
      }
    }
  };

  return (
    <body className="w-screen h-screen">
      <div className="pt-24 py-12 flex justify-center">
        <CountdownBar />
      </div>
      <div className="flex justify-center items-center">
        <div className="w-1/4  text-lg"></div>
        <div className="w-2/4">
          <h1 className="text-center font-mono text-2xl">{question}</h1>
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
          {answers[Number(count)]["src"].length > 0 &&
            answers[Number(count)]["src"].map(
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
