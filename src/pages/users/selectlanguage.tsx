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
    <div className="w-full h-screen flex items-center justify-evenly">
      <PrimaryButton label={"Python"} onClick={() => goSelectLevel("python")} />
      <PrimaryButton
        label={"JavaScript"}
        onClick={() => goSelectLevel("javascript")}
      />
    </div>
  );
};

export default Selectlanguage;
