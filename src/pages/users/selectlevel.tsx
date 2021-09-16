import React, { useState } from "react";
import { PrimaryButton } from "../../components/atoms";
import Router, { useRouter } from "next/router";
import GuLogo from "../../components/atoms/Gu";
import ChokiLogo from "../../components/atoms/Choki";
import PaLogo from "../../components/atoms/Pa";
import Modal from "../../components/organisms/Modal";

// ファイル名は[uid].tsxに後から変更
const Selectlanguage = () => {
  const router = useRouter();
  const [show, setShow] = useState(false);

  const goToPlay = (selectedLevel: string) => {
    setShow(true);

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
        <div className="bg-gray-200 rounded-lg shadow-xl overflow-hidden py-8 mr-4 ml-8">
          <div className=" w-full object-cover">
            <GuLogo />
          </div>
          <div className="grid justify-items-center items-center text-center pt-8">
            <PrimaryButton label={"easy"} onClick={() => goToPlay("easy")} />
          </div>
        </div>
        <div className="bg-gray-200 rounded-lg shadow-xl overflow-hidden py-8 mx-4">
          <div className=" w-full object-cover">
            <ChokiLogo />
          </div>
          <div className="grid justify-items-center items-center text-center pt-8">
            <PrimaryButton
              label={"normal"}
              onClick={() => goToPlay("normal")}
            />
          </div>
        </div>
        <div className="bg-gray-200 rounded-lg shadow-xl overflow-hidden py-8 ml-4 mr-8">
          <div className=" w-full object-cover">
            <PaLogo />
          </div>
          <div className="grid justify-items-center items-center text-center pt-8">
            <PrimaryButton label={"difficult"} onClick={() => setShow(true)} />
          </div>
        </div>
      </div>
      <Modal
        show={show}
        setShow={setShow}
        // query={{
        //   language: router.query["language"],
        //   level: selectedLevel,
        //   count: 1,
        // }}
        onClick={() => goToPlay}
      />
    </div>
  );
};

export default Selectlanguage;
