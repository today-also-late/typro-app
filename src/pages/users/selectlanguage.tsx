import React from "react";
import { PrimaryButton } from "../../components/atoms";
import Router from "next/router";

const goSelectLevel = (selectedLanguage: string) => {
  Router.push({
    pathname: "/users/selectlevel",
    query: {
      language: selectedLanguage,
    },
  });
};

// ファイル名は[uid].tsxに後から変更
const Selectlanguage = () => {
  return (
    <div>
      <div className="flex items-center justify-evenly pt-64 text-5xl">
        言語を選択
      </div>
      <div className="w-full pt-48 flex items-center justify-evenly">
        <PrimaryButton
          label={"Python"}
          onClick={() => goSelectLevel("python")}
        />
        <PrimaryButton
          label={"JavaScript"}
          onClick={() => goSelectLevel("javascript")}
        />
      </div>
    </div>
  );
};

export default Selectlanguage;
