import React from "react";
import { PrimaryButton } from "../../components/atoms";
import Router, { useRouter } from "next/router";

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
    <div className="w-full h-full">
      <div className="pt-72  flex items-center justify-center">
        <div className="w-1/3 h-1/3 text-center text-6xl">
          <PrimaryButton label={"easy"} onClick={() => goToPlay("easy")} />
          <PrimaryButton label={"normal"} onClick={() => goToPlay("normal")} />
          <PrimaryButton
            label={"difficult"}
            onClick={() => goToPlay("difficult")}
          />
        </div>
      </div>
    </div>
  );
};

export default Selectlanguage;
