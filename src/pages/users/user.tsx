import React from "react";
import Chart from "../../components/organisms/Chart";

// ファイル名は[uid].tsxに後から変更
const User = () => {
  return (
    <div className="pt-16">
      <div>
        <p>user-name</p>
      </div>
      <div className="mx-auto max-w-min w-1/4">
        <Chart />
      </div>
    </div>
  );
};

export default User;
