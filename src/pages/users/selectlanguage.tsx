import React from "react";
import { PrimaryButton } from "../../components/atoms";
import Router from "next/router";
import PythonLogo from "../../components/atoms/PythonLogo";
import JsLogo from "../../components/atoms/JsLogo";
import GoLogo from "../../components/atoms/GoLogo";
import CLogo from "../../components/atoms/CLogo";

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
    <div className="">
      <div className="text-center py-24 text-2xl">
        <p>言語を選択してください</p>
      </div>
      <div className="flex justify-evenly">
        <div>
          <PythonLogo />
          <PrimaryButton
            label={"Python"}
            onClick={() => goSelectLevel("python")}
          />
        </div>
        <div>
          <JsLogo />
          <PrimaryButton
            label={"JavaScript"}
            onClick={() => goSelectLevel("javascript")}
          />
        </div>
        <div>
          <CLogo />
          <PrimaryButton label={"C"} onClick={() => goSelectLevel("python")} />
        </div>
        <div>
          <GoLogo />
          <PrimaryButton label={"Go"} onClick={() => goSelectLevel("python")} />
        </div>
      </div>
    </div>
  );
};

export default Selectlanguage;
