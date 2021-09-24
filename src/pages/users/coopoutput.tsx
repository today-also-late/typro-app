import { useCallback, useMemo } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextInput, TimeUpCountDown } from "../../components/atoms";
import { fetchAnswersFromRoom } from "../../../redux/slices/answersSlice";
import { useEffect } from "react";
import { getAnswers } from "../../../redux/slices/answersSlice";
import { getQuestions } from "../../../redux/slices/questionsSlice";
import Router, { useRouter } from "next/router";
import Keybord from "../../../public/audios/keybord.mp3";
import DisplayQ2 from "../../../public/audios/displayquestion2.mp3";
import Miss from "../../../public/audios/miss.mp3";
import Success from "../../../public/audios/success.mp3";
import {
  addAnswersToRoom,
  addMissAnswersToRoom,
  changeCode,
  changeTurn,
  endRoom,
} from "../../../redux/slices/roomsSlice";
import { db } from "../../firebase/firebase";
import { getUser } from "../../../redux/slices/userSlice";
import Stamp from "../../components/organisms/Stamp";
import ITyped from "../../firebase/ityped";

const CoopOutput = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const user = useSelector(getUser).user;
  const answers = useSelector(getAnswers).answers; // answers.srcとanswers.outputがある
  const questions = useSelector(getQuestions).questions;

  const language: string | string[] | undefined = router.query["language"];
  const level: string | string[] | undefined = router.query["level"];
  const count: string | string[] | undefined = router.query["count"];
  const roomId: any = router.query["roomId"];

  const [code, setCode] = useState("");
  const [question, setQuesiton] = useState("");
  const [currentId, setCurrentId] = useState(1);
  const [alertText, setAlertText] = useState("");
  const [missCount, setMissCount] = useState(0);
  const [isMyTurn, setIsMyTurn] = useState(false);
  const [anothorCode, setAnothorCode] = useState("");
  const [turn, setTurn] = useState("");
  const [isEnd, setIsEnd] = useState(false);

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
      setAlertText("");
      if (event.target.value.match(/  /)) {
        event.target.value = event.target.value.replace(/  /g, " ");
      }
      setCode(event.target.value);
      dispatch(changeCode({ roomId: roomId, code: event.target.value }));
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

  const goResult = () => {
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
    setTimeout(
      () =>
        Router.push({
          pathname: "/users/result",
          query: {
            language: language,
            level: level,
            roomId: roomId,
          },
        }),
      3000
    );
  };

  useEffect(() => {
    const unsubscribeRoom = db
      .collection("rooms")
      .doc(roomId)
      .onSnapshot(async (snapshot) => {
        const data: any = snapshot.data();

        if (data.answers.miss.length > answers.miss.length) {
          dispatch(fetchAnswersFromRoom(roomId));
        }

        if (data.isEnd) {
          // すべての問題が終了したとき
          setIsEnd(true);
          goResult();

          return () => unsubscribeRoom();
        }

        if (data.count > Number(count)) {
          // 1問目の出力の回答が終わったとき
          performance.mark("question1output:end");
          Router.push({
            pathname: "/users/coopplay",
            query: {
              language: language,
              level: level,
              roomId: roomId,
              count: data.count,
            },
          });
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

  const displayNextQuestion = (nextQuestionId: number) => {
    if (
      nextQuestionId > Object.keys(questions[Number(count)]["output"]).length
    ) {
      if (Number(count) === 1) {
        if (turn === "creator") {
          dispatch(
            changeTurn({
              roomId: roomId,
              nextTurn: "participant",
              nextQuestionId: 1,
              code: "",
              count: Number(count) + 1,
            })
          );
        }
        if (turn === "participant") {
          dispatch(
            changeTurn({
              roomId: roomId,
              nextTurn: "creator",
              nextQuestionId: 1,
              code: "",
              count: Number(count) + 1,
            })
          );
        }
      }
      if (Number(count) === 2) {
        dispatch(
          endRoom({
            roomId: roomId,
            isEnd: true,
          })
        );
      }
    }
    setQuesiton(questions[Number(count)]["output"][nextQuestionId]);
    setCurrentId(nextQuestionId);
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
          dispatch(
            addAnswersToRoom({
              roomId: roomId,
              code: code,
              count: Number(count),
              isSrc: "output",
            })
          );
        } else if (Number(count) === 2) {
          dispatch(
            addAnswersToRoom({
              roomId: roomId,
              code: code,
              count: Number(count),
              isSrc: "output",
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
        let nextQuestionId = currentId + 1;
        displayNextQuestion(nextQuestionId);
      } else {
        audioMiss?.play();
        setMissCount((prevState) => prevState + 1);
        setAlertText("コードが違います。");
      }
    }
  };
  if (!isEnd) {
    return (
      <body className="w-screen h-screen ">
        <div className="h-1/3 pt-24 flex justify-center">
          <div className="w-1/4 h-1/2 text-lg">
            {answers[Number(count)]["output"].length > 0 &&
              answers[Number(count)]["output"].map(
                (answer: string, index: number) => (
                  <div className="ml-6" key={index}>
                    {index + 1} : {answer}
                  </div>
                )
              )}
          </div>
          <div className="w-1/2 flex justify-center">
            <TimeUpCountDown question={questions[Number(count)]["timelimit"]} />
          </div>
          <div className="w-1/4 h-1/2 text-lg">
            {answers[Number(count)]["src"].length > 0 &&
              answers[Number(count)]["src"].map(
                (answer: string, index: number) => (
                  <div className="ml-6" key={index}>
                    {index + 1} : {answer}
                  </div>
                )
              )}
          </div>
        </div>
        <div className="flex justify-center items-center">
          <div className="w-2/4">
            <h1 className="text-center font-mono text-2xl">{"出力は?"}</h1>
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
        </div>
        {isMyTurn && (
          <div>
            <div className="text-center text-red-500">{alertText}</div>
            <div className="text-center text-red-500">
              {"miss:" + missCount}
            </div>
          </div>
        )}
        <Stamp />
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
export default CoopOutput;
