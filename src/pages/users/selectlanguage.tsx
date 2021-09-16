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
      <div className="text-center py-24 text-2xl font-bold">
        <p>言語を選択してください</p>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 text-center">
        <div className="bg-gray-200 rounded-lg shadow-xl overflow-hidden py-8 mr-4 ml-8">
          <div className=" w-full object-cover">
            <PythonLogo />
          </div>
          <div className="grid justify-items-center items-center text-center pt-8">
            <PrimaryButton
              label={"Python"}
              onClick={() => goSelectLevel("python")}
            />
          </div>
        </div>

        <div className="bg-gray-200 rounded-lg shadow-xl overflow-hidden py-8 mx-4">
          <div className=" w-full object-cover">
            <JsLogo />
          </div>
          <div className="grid justify-items-center items-center text-center pt-8">
            <PrimaryButton
              label={"JavaScript"}
              onClick={() => goSelectLevel("javascript")}
            />
          </div>
        </div>

        <div className="bg-gray-200 rounded-lg shadow-xl overflow-hidden py-8 mx-4">
          <div className=" w-full object-cover">
            <CLogo />
          </div>
          <div className="grid justify-items-center items-center text-center pt-8">
            <PrimaryButton
              label={"C"}
              onClick={() => goSelectLevel("python")}
            />
          </div>
        </div>

        <div className="bg-gray-200 rounded-lg shadow-xl overflow-hidden py-8 ml-4 mr-8">
          <div className=" w-full object-cover">
            <GoLogo />
          </div>
          <div className="grid justify-items-center items-center text-center pt-8">
            <PrimaryButton
              label={"Go"}
              onClick={() => goSelectLevel("python")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Selectlanguage;
