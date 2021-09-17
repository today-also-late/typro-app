import React, { useState, useEffect } from "react";
import Gif from "../atoms/Gif";
import fight from "../../../public/images/stamp/fight.gif";
import nicePlay from "../../../public/images/stamp/niceplay.gif";
import osii from "../../../public/images/stamp/osii.gif";
import genius from "../../../public/images/stamp/genius.gif";
import { Button } from "@material-ui/core";
import router from "next/router";
import { db } from "../../firebase/firebase";

const Stamp = () => {
  const roomId: any = router.query["roomId"];
  const [createrSelected, setCreaterSelected] = useState<null | number>(null);
  const [participantSelected, setParticipantSelected] = useState<null | number>(
    null
  );

  //   自分のスタンプを相手に送る
  //   useEffect(() => {
  //     const mySelectedStamp = db
  //       .collection("rooms")
  //       .doc(roomId)
  //       .set({ mySelected: mySelected });
  //   }, [mySelected]);

  useEffect(() => {
    if (createrSelected !== null) {
    }
    const createrSelectedStamp = db
      .collection("rooms")
      .doc(roomId)
      .update({ createrSelected: createrSelected });
    //   .onSnapshot((snapshot) => {
    //     const data: any = snapshot.data();
    //     console.log(data);
    //     return () => mySelectedStamp();
    //   });
  }, [createrSelected]);

  //   相手のスタンプを取得する
  //   useEffect(() => {
  //     const coopSelectedStamp = db
  //       .collection("rooms")
  //       .doc(roomId)
  //       .set({ coopSelected: coopSelected });
  //   }, [coopSelected]);

  useEffect(() => {
    const participantSelectedStamp = db
      .collection("rooms")
      .doc(roomId)
      .onSnapshot((snapshot) => {
        const data: any = snapshot.data();
        console.log(data);
        return () => participantSelectedStamp();
      });
  }, [participantSelected]);

  const clickAction = (index: null | number) => {
    setCreaterSelected(index);
    setTimeout(toNull, 5000);
  };

  const toNull = () => {
    setCreaterSelected(null);
  };

  const gifName = ["ファイト", "ナイスプレイ", "おしい", "天才か？"];
  const gifSorce = [fight, nicePlay, osii, genius];

  return (
    <div className="w-full">
      {gifName.map((name, index) => (
        <div key={name} className="text-center">
          <Button onClick={() => clickAction(index)}>{name}</Button>
        </div>
      ))}

      <div>
        <div className="text-right">
          <div className={` ${createrSelected !== null ? "block" : "hidden"}`}>
            <p>自分のスタンプ</p>
            {createrSelected === null ? (
              <></>
            ) : (
              <Gif gifSorce={gifSorce[createrSelected]} />
            )}
          </div>
        </div>
        <div className="text-left">
          <div
            className={` ${participantSelected !== null ? "block" : "hidden"}`}
          >
            <p>相手のスタンプ</p>
            {participantSelected === null ? (
              <></>
            ) : (
              <Gif gifSorce={gifSorce[participantSelected]} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stamp;
