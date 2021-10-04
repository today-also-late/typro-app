import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAnswers } from "../../../redux/slices/answersSlice";
import { getQuestions } from "../../../redux/slices/questionsSlice";
import { getUser } from "../../../redux/slices/userSlice";
import { PrimaryButton } from "../../components/atoms";
import Router from "next/router";

const Result = () => {
  const answers = useSelector(getAnswers).answers;
  const questions = useSelector(getQuestions).questions;

  const router = useRouter();

  const language: any = router.query["language"];
  const level: any = router.query["level"];

  // const allEntries = performance.getEntriesByType("mark");

  const p1src = performance.getEntriesByName("question1src");
  const p2src = performance.getEntriesByName("question2src");
  const p1output = performance.getEntriesByName("question1output");
  const p2output = performance.getEntriesByName("question2output");
  const t1src: number = p1src[0].duration / 1000; // 1問目のsrcにかかった時間
  const t2src: number = p2src[0].duration / 1000; // 2問目のsrcにかかった時間
  const t1output: number = p1output[0].duration / 1000; // 1問目のoutputにかかった時間
  const t2output: number = p2output[0].duration / 1000; // 2問目のoutputにかかった時間

  const firstSrc = answers[1]["src"].join("");
  const secondSrc = answers[2]["src"].join("");
  const SecondPerSecond: number =
    (t1src + t2src) / (firstSrc.length + secondSrc.length);
  const TypePerSecond: number =
    (firstSrc.length + secondSrc.length) / (t1src + t2src);
  const tl1: number = questions[1].timelimit; // 1問目のoutputの制限時間
  const tl2: number = questions[2].timelimit; // 2問目のoutputの制限時間
  const rw1: number = t1output < tl1 ? questions[1].reward : 0; // 1問目の報酬 outputの制限時間内に答えられればもらえる
  const rw2: number = t2output < tl2 ? questions[2].reward : 0; // 2問目の報酬
  const tp: number = 30 / SecondPerSecond; // timepoint : タイピング速度が早ければ早いほどpointが上がる

  const totalmiss = answers.miss.reduce(
    (sum: number, element: number) => sum + element,
    0
  );
  const m_w: number = 5; // missの重み 1回ミスで-5

  const score: number = tp + rw1 + rw2 - totalmiss * m_w; // score

  useEffect(() => {
    // guestはscoreを登録はしない
    // dispatch(
    //   addScore({
    //     uid: user.uid,
    //     score: Math.floor(score),
    //     language: language,
    //     level: level,
    //   })
    // );
    console.log(t1src);
    console.log(t2src);
    console.log(t1output);
    console.log(t2output);

    // リロード,タブを閉じるときに警告(禁止はできない)
    window.addEventListener("beforeunload", onUnload);

    return () => (
      performance.clearMeasures(),
      performance.clearMarks(),
      window.removeEventListener("beforeunload", onUnload)
    );
  }, []);

  const onUnload = (e: any) => {
    e.preventDefault();
    e.returnValue = "";
  };

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="text-center ">
        <p className="text-5xl underline">Result</p>
        <div className="h-8" />
        <div className="text-3xl">
          <div className="flex items-center justify-center">
            Score　:　{" "}
            <p className="text-blue-800 font-bold">
              {score > 0 ? Math.floor(score) : 0}{" "}
            </p>
          </div>
          <div className="h-4" />
          <div>
            Miss　:　
            {totalmiss}
          </div>
          <div className="h-4" />
          <div className="text-xl">
            1秒あたりの入力数　:　
            {TypePerSecond.toPrecision(3)}&nbsp;&nbsp;[文字/秒]
          </div>
        </div>
        <div className="mt-10"></div>
        <div className="border-solid border-2 border-gray-400 mt-10">
          <div className="w-1/3">
            <div className="text-xl mt-3 mb-2">1問目</div>
            <div className="border-b-2 border-gray-400 mx-2"></div>
          </div>
          {answers[1]["src"].length > 0 &&
            answers[1]["src"].map((src: string, index: number) => (
              <div className="w-full flex" key={index}>
                <div className="w-1/3" />
                <pre className="w-2/3 pre text-left mx-2">{src}</pre>
              </div>
            ))}

          <div className="w-1/3">
            <div className="text-xl mt-3 mb-2">出力</div>
            <div className="border-b-2 border-gray-400 mx-2"></div>
          </div>
          {answers[1]["output"].length > 0 &&
            answers[1]["output"].map((output: string, index: number) => (
              <div className="w-full flex mt-3 mb-3 " key={index}>
                <div className="w-1/3" />
                <pre className="w-2/3 pre text-left mx-2">{output}</pre>
              </div>
            ))}
        </div>

        <div className="border-solid border-2 border-gray-400 mt-10">
          <div className="w-1/3">
            <div className="text-xl mt-3 mb-2">2問目</div>
            <div className="border-b-2 border-gray-400 mx-2"></div>
          </div>
          {answers[2]["src"].length > 0 &&
            answers[2]["src"].map((src: string, index: number) => (
              <div className="w-full flex" key={index}>
                <div className="w-1/3" />
                <pre className="w-2/3 pre text-left mx-2">{src}</pre>
              </div>
            ))}

          <div className="w-1/3">
            <div className="text-xl mt-3 mb-2">出力</div>
            <div className="border-b-2 border-gray-400 mx-2"></div>
          </div>
          {answers[2]["output"].length > 0 &&
            answers[2]["output"].map((output: string, index: number) => (
              <div className="w-full flex mt-3 mb-3 " key={index}>
                <div className="w-1/3" />
                <pre className="w-2/3 pre text-left mx-2">{output}</pre>
              </div>
            ))}
        </div>
        <div className="mt-10"></div>
        <PrimaryButton
          label={"アカウントを作成する"}
          onClick={() => Router.push("/signup")}
        />
      </div>
    </div>
  );
};
export default Result;
