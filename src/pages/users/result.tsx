import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnswers } from "../../../redux/slices/answersSlice";
import { getQuestions } from "../../../redux/slices/questionsSlice";
import { getUser } from "../../../redux/slices/userSlice";
import { addScore } from "../../../redux/slices/scoreSlice";

const Result = () => {
  const answers = useSelector(getAnswers).answers;
  const questions = useSelector(getQuestions).questions;
  const user = useSelector(getUser).user;

  const router = useRouter();
  const dispatch = useDispatch();

  const language: any = router.query["language"];
  const level: any = router.query["level"];

  const p1 = performance.getEntriesByName("question1");
  const p2 = performance.getEntriesByName("question2");
  const t1: number = p1[0].duration;
  const t2: number = p2[0].duration;
  const tl1: number = questions[1].timelimit;
  const tl2: number = questions[2].timelimit;
  const rw1: number = questions[1].reward;
  const rw2: number = questions[2].reward;
  const t_w: number = 0.0002; // (timelimit - time) * t_w
  const tp1: number = (tl1 - t1) * t_w > 0 ? (tl1 - t1) * t_w : 0;
  const tp2: number = (tl2 - t2) * t_w > 0 ? (tl2 - t2) * t_w : 0;

  const totalmiss = answers.miss.reduce(
    (sum: number, element: number) => sum + element,
    0
  );
  const m_w: number = 0.2; // 5回ミスでreward-1
  const rwp: number =
    rw1 + rw2 - totalmiss * m_w > 0 ? rw1 + rw2 - totalmiss * m_w : 0;

  useEffect(() => {
    dispatch(
      addScore({
        uid: user.uid,
        score: Math.floor(score),
        language: language,
        level: level,
      })
    );
  }, []);

  const score: number = tp1 + tp2 + rwp;

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="pt-16 text-center text-4xl">
        <p>Score: {score > 0 ? Math.floor(score) : 0}</p>
        <p>Miss: {totalmiss} 回</p>
      </div>
      <div className="pt-16 text-center text-4xl">
        Result
        <br></br>
        <div className="text-xl">
          1問目
          <br></br>
          {answers[1]["src"].length > 0 &&
            answers[1]["src"].map((src: string, index: number) => (
              <div className="ml-24" key={index}>
                {"code" + (index + 1)} : {src}
              </div>
            ))}
          {answers[1]["output"].length > 0 &&
            answers[1]["output"].map((output: string, index: number) => (
              <div className="ml-24" key={index}>
                {"output"} : {output}
              </div>
            ))}
          <br></br>
          2問目
          <br></br>
          {answers[2]["src"].length > 0 &&
            answers[2]["src"].map((src: string, index: number) => (
              <div className="ml-24" key={index}>
                {"code" + (index + 1)} : {src}
              </div>
            ))}
          {answers[2]["output"].length > 0 &&
            answers[2]["output"].map((output: string, index: number) => (
              <div className="ml-24" key={index}>
                {"output"} : {output}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default Result;
