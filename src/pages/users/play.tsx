import { useCallback } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextInput } from "../../components/atoms";
import {
  addFirstSrcAnswers,
  addSecondSrcAnswers,
  addMissAnswers,
  emptySecondSrcAnswers,
} from "../../../redux/slices/answersSlice";
import { useEffect } from "react";
import { getAnswers, emptyAnswers } from "../../../redux/slices/answersSlice";
import {
  getQuestions,
  updateQuestionsState,
} from "../../../redux/slices/questionsSlice";
import Router, { useRouter } from "next/router";

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

  const InputCode = useCallback(
    (event) => {
      setAlertText("");
      if (event.target.value.match(/  /)) {
        event.target.value = event.target.value.replace(/  /g, " ");
      }
      setCode(event.target.value);
    },
    [setCode]
  );

  useEffect(() => {
    if (Number(count) === 1) {
      dispatch(updateQuestionsState(selected)); // dbからquestionをとってくる
      dispatch(emptyAnswers());
    }
    if (Number(count) === 2) {
      dispatch(emptySecondSrcAnswers());
    }
  }, []);

  useEffect(() => {
    displayNextQuestion(currentId);
    if (Number(count) === 1) {
      performance.mark("question:start");
      performance.mark("question1:start");
    }

    if (Number(count) === 2) {
      performance.mark("question2:start");
    }
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
        setMissCount((prevState) => prevState + 1);
        setAlertText("コードが違います。");
      }
    }
  };

  return (
    <body className="w-screen h-screen flex justify-center items-center">
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
          answers[Number(count)]["src"].map((answer: string, index: number) => (
            <div className="ml-24" key={index}>
              {index + 1} : {answer}
            </div>
          ))}
      </div>
    </body>
  );
};
export default Play;
