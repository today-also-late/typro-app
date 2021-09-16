import React from "react";

const outline = () => {
  return (
    <div className="text-center pt-24">
      <div className="bg-gray-100 mx-32 p-12">
        <p className="pb-8">このアプリis 何</p>
        <p>
          プログラミング教育必修化に向け、初学者(中高生)がスムーズにプログラミングを学ぶための助けとなるタイピングアプリです。
        </p>
      </div>
      <div className="mt-32 mx-32 bg-gray-100 p-12">
        <p className="pb-8">何ができる</p>
        <p>
          本アプリでは1つのプログラムを1行づつ入力し、タイピング中も思考させるために出力結果まで解答します。解答後の解説で、コードを詳細まで理解することも可能です。
        </p>
      </div>
    </div>
  );
};

export default outline;
