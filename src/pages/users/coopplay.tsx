import { useCallback } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextInput, TimeUpCountDown } from "../../components/atoms";

import { useEffect } from "react";
import {
  fetchAnswersFromRoom,
  getAnswers,
} from "../../../redux/slices/answersSlice";
import {
  fetchQuestonsFromRoom,
  getQuestions,
  updateQuestionsState,
} from "../../../redux/slices/questionsSlice";
import Router, { createRouter, useRouter } from "next/router";
import Keybord from "../../../public/audios/keybord.mp3";
import DisplayQ from "../../../public/audios/displayquestion1.mp3";
import Miss from "../../../public/audios/miss.mp3";
import Success from "../../../public/audios/success.mp3";
import { getUser } from "../../../redux/slices/userSlice";
import {
  addAnswersToRoom,
  addMissAnswersToRoom,
  changeCode,
  changeTurn,
} from "../../../redux/slices/roomsSlice";
import { db } from "../../firebase/firebase";
import Stamp from "../../components/organisms/Stamp";

const CoopPlay = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector(getUser).user;
  const answers = useSelector(getAnswers).answers;
  const questions = useSelector(getQuestions).questions;

  const language: any = router.query["language"];
  const level: any = router.query["level"];
  const count: string | string[] | undefined = router.query["count"];
  const roomId: any = router.query["roomId"];

  const [code, setCode] = useState("");
  const [question, setQuestion] = useState("");
  const [currentId, setCurrentId] = useState(1);
  const [alertText, setAlertText] = useState("");
  const [missCount, setMissCount] = useState(0);
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [anothorCode, setAnothorCode] = useState("");
  const [turn, setTurn] = useState("");

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

  const settingAudio = () => {
    setAudioKeybord(new Audio(Keybord));
    setAudioDisplayQ(new Audio(DisplayQ));
    setAudioMiss(new Audio(Miss));
    setAudioSuccess(new Audio(Success));
  };

  const InputCode = useCallback(
    (event) => {
      setAlertText("");
      if (event.target.value.match(/  /)) {
        event.target.value = event.target.value.replace(/  /g, " ");
      }
      setCode(event.target.value);
      dispatch(changeCode({ roomId: roomId, code: event.target.value }));
    },
    [setCode]
  );

  const displayNextQuestion = (nextQuestionId: number) => {
    if (nextQuestionId > Object.keys(questions[Number(count)]["src"]).length) {
      if (Number(count) === 1) {
        performance.mark("question1src:end");
      }
      if (Number(count) === 2) {
        performance.mark("question2src:end");
      }
      Router.push({
        pathname: "/users/coopoutput",
        query: {
          language: language,
          level: level,
          count: Number(count),
          roomId: roomId,
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
      const noIndentQuestion = question.trim();
      if (code === noIndentQuestion) {
        audioSuccess?.play();

        if (Number(count) === 1) {
          dispatch(
            addAnswersToRoom({
              roomId: roomId,
              code: question,
              count: Number(count),
              isSrc: "src",
            })
          );
          // dbのroomにanswersを追加する
        } else if (Number(count) === 2) {
          dispatch(
            addAnswersToRoom({
              roomId: roomId,
              code: question,
              count: Number(count),
              isSrc: "src",
            })
          );
        }
        setCode("");
        setAlertText("正解です。");
        dispatch(
          addMissAnswersToRoom({
            roomId: roomId,
            missCount: missCount,
          })
        );
        // missの回数をdbのroomに追加する
        setIsMyTurn(false);
        if (turn === "creator") {
          dispatch(
            changeTurn({
              roomId: roomId,
              nextTurn: "participant",
              nextQuestionId: currentId + 1,
              code: "",
              count: Number(count),
            })
          );
        }
        if (turn === "participant") {
          dispatch(
            changeTurn({
              roomId: roomId,
              nextTurn: "creator",
              nextQuestionId: currentId + 1,
              code: "",
              count: Number(count),
            })
          );
        }
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
      displayNextQuestion(currentId); // 最初の問題を表示
      performance.mark("question:start");
      performance.mark("question1src:start");
    }

    if (Number(count) === 2) {
      displayNextQuestion(currentId); // 最初の問題を表示
      performance.mark("question2src:start");
    }

    window.addEventListener("beforeunload", onUnload);

    return () => {
      // イベントの設定解除
      window.removeEventListener("beforeunload", onUnload);
    };
  }, []);

  useEffect(() => {
    const unsubscribeRoom = db
      .collection("rooms")
      .doc(roomId)
      .onSnapshot((snapshot) => {
        const data: any = snapshot.data();

        if (data.answers.miss.length > answers.miss.length) {
          dispatch(fetchAnswersFromRoom(roomId));
          // dbのroomからstoreのanswerに反映させる
        }

        if (data.nextQuestionId > currentId) {
          displayNextQuestion(data.nextQuestionId);
        }

        if (data.nextTurn == "creator") {
          // creatorが入力する番で
          setTurn("creator");
          if (data.creator == user.uid) {
            // 自分がcreatorならば
            setIsMyTurn(true);
          }
        }
        if (data.nextTurn == "participant") {
          // participantが入力する番で
          setTurn("participant");
          if (data.participant == user.uid) {
            // 自分がparticipantならば
            setIsMyTurn(true);
          }
        }

        setAnothorCode(data.code); // 相手が入力しているコード
      });

    return () => unsubscribeRoom();
  }, []);

  const onUnload = (e: any) => {
    e.preventDefault();
    e.returnValue = "";
  };

  return (
    <body className="w-full h-screen">
      <div className="h-1/3 pt-24 flex justify-center">
        <div className="w-1/4 h-1/2 text-lg" />
        <div className="w-1/2 flex justify-center">
          <TimeUpCountDown question={question} />
        </div>
        <div className="w-1/4 h-1/2 text-lg">
          {answers[Number(count)]["src"].length > 0 &&
            answers[Number(count)]["src"].map(
              (answer: string, index: number) => (
                <pre className="pre" key={index}>
                  {index + 1} : {answer}
                </pre>
              )
            )}
        </div>
      </div>
      <div className="flex justify-center items-center">
        <div className="w-2/4  text-center ">
          <h1 className="text-center font-mono text-2xl user-select-none ">
            {question}
          </h1>
          <div className="flex justify-center items-center">
            <div className="w-1/6" />
            <div className="w-2/3">
              {isMyTurn ? (
                <div className="w-full">
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
                  <div className="text-center text-red-500">
                    あなたが入力する番です
                  </div>
                </div>
              ) : (
                <div className="w-full">
                  <div className="bg-gray-100">
                    <TextInput
                      fullWidth={true}
                      autoFocus={true}
                      margin="dense"
                      multiline={false}
                      required={true}
                      rows={1}
                      value={anothorCode}
                      type={"text"}
                      variant={"outlined"}
                    />
                  </div>
                  <div className="text-center text-red-500">
                    相手が入力する番です
                  </div>
                </div>
              )}
            </div>
            <div className="w-1/6" />
          </div>
          {isMyTurn && (
            <div className="flex justify-center">
              <div className="text-center text-red-500">{alertText}</div>
              <div className="text-center text-red-500">
                {"miss:" + missCount}
              </div>
            </div>
          )}
        </div>
      </div>
      <Stamp />
    </body>
  );
};
export default CoopPlay;
