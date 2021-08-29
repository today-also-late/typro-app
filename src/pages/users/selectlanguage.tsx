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
    <div className="w-full h-full">
      <div className="pt-72  flex items-center justify-center">
        <div className="w-1/3 h-1/3 text-center">
          <PrimaryButton
            label={"Python"}
            onClick={() => goSelectLevel("python")}
          />
        </div>
        <div className="w-1/3 h-1/3 text-center">
          <PrimaryButton
            label={"JavaScript"}
            onClick={() => goSelectLevel("javascript")}
          />
        </div>
      </div>
    </div>
  );
};

export default Selectlanguage;
