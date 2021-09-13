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
    <div className="w-hull h-screen flex items-center justify-evenly">
      <PrimaryButton label={"easy"} onClick={() => goToPlay("easy")} />
      <PrimaryButton label={"normal"} onClick={() => goToPlay("normal")} />
      <PrimaryButton
        label={"difficult"}
        onClick={() => goToPlay("difficult")}
      />
    </div>
  );
};

export default Selectlanguage;
