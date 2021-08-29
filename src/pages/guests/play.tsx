import { useCallback } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextInput } from "../../components/atoms";
import { addFirstSrcAnswers } from "../../../redux/slices/answersSlice";
import { useEffect } from "react";
import { getAnswers } from "../../../redux/slices/answersSlice";
import {
  getQuestions,
  updateQuestionsState,
} from "../../../redux/slices/questionsSlice";
import { emptyAnswers } from "../../../redux/slices/answersSlice";

const Play = () => {
  const dispatch = useDispatch();

  const srcAnswers = useSelector(getAnswers).answers.src;

  const questions = useSelector(getQuestions).questions;

  const [code, setCode] = useState("");
  const [question, setQuesiton] = useState("");
  const [currentId, setCurrentId] = useState("1");
  const [alertText, setAlertText] = useState("");

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
    dispatch(emptyAnswers()); // リロードされたときにanswerstateを空にする
    dispatch(updateQuestionsState({ language: "Python", level: "1" }));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    displayNextQuestion(currentId);
  }, [questions]);

  const displayNextQuestion = (nextQuestionId: string) => {
    setQuesiton(questions["src"][nextQuestionId]);
    setCurrentId(nextQuestionId);
  };

  const Judge = (e: any, code: string) => {
    if (e.key === "Enter") {
      if (code.match(/'/)) {
        code = code.replace(/'/g, '"');
      }
      if (code === question) {
        dispatch(addFirstSrcAnswers(code));
        setCode("");
        setAlertText("正解です。");
        let nextQuestionId = (Number(currentId) + 1).toString();
        displayNextQuestion(nextQuestionId);
      } else {
        setAlertText("コードが違います。");
      }
    }
  };

  return (
    <body className="w-screen h-screen flex justify-center items-center">
      <div className="w-1/4 text-center">
        <div className="">menu</div>
        <br />
        <div className="">ヒント</div>
        <br />
        <div className="">一時停止</div>
        <br />
        <div className="">出力</div>
        <br />
      </div>
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
      </div>
      <div className="w-1/4  text-lg">
        {srcAnswers.length > 0 &&
          srcAnswers.map((answer: string, index: number) => (
            <div className="ml-24" key={index}>
              {index + 1} : {answer}
            </div>
          ))}
      </div>
    </body>
  );
};
export default Play;
