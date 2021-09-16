import React from "react";
import { PrimaryButton } from "../../components/atoms";
import Router, { useRouter } from "next/router";
import GuLogo from "../../components/atoms/Gu";
import ChokiLogo from "../../components/atoms/Choki";
import PaLogo from "../../components/atoms/Pa";

// ファイル名は[uid].tsxに後から変更
const Selectlanguage = () => {
  const router = useRouter();

  const goToPlay = (selectedLevel: string) => {
    Router.push({
      pathname: "/users/play",
      query: {
        language: router.query["language"],
        level: selectedLevel,
        count: 1,
      },
    });
  };

  return (
    <div className="">
      <div className="text-center py-24 text-2xl font-bold">
        <p>難易度を選択してください</p>
      </div>
      <div className="grid grid-cols-3 text-center">
        <button
          className="bg-gray-200 hover:bg-gray-300 rounded-lg shadow-xl overflow-hidden py-8 mr-4 ml-8"
          onClick={() => goToPlay("easy")}
        >
          <div className=" w-full object-cover">
            <GuLogo />
          </div>
          <div className="grid justify-items-center items-center text-center text-xl font-bold pt-8">
            <p>easy</p>
          </div>
        </button>
        <button
          className="bg-gray-200 hover:bg-gray-300 rounded-lg shadow-xl overflow-hidden py-8 mx-4"
          onClick={() => goToPlay("normal")}
        >
          <div className=" w-full object-cover">
            <ChokiLogo />
          </div>
          <div className="grid justify-items-center items-center text-center text-xl font-bold  pt-8">
            <p>normal</p>
          </div>
        </button>
        <button
          className="bg-gray-200 hover:bg-gray-300 rounded-lg shadow-xl overflow-hidden py-8 ml-4 mr-8"
          onClick={() => goToPlay("difficult")}
        >
          <div className=" w-full object-cover">
            <PaLogo />
          </div>
          <div className="grid justify-items-center items-center text-center text-xl font-bold  pt-8">
            <p>difficult</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Selectlanguage;
