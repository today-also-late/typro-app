import React, { useState } from "react";
import Gif from "../atoms/Gif";
import fight from "../../../public/images/stamp/fight.gif";
import nicePlay from "../../../public/images/stamp/niceplay.gif";
import osii from "../../../public/images/stamp/osii.gif";
import genius from "../../../public/images/stamp/genius.gif";
import { Button } from "@material-ui/core";

const Stamp = () => {
  const [selected, setSelected] = useState<null | number>(null);
  const clickAction = (index: null | number) => {
    setSelected(index);
  };

  const gifName = ["ファイト", "ナイスプレイ", "おしい", "天才か？"];
  const gifSorce = [fight, nicePlay, osii, genius];

  return (
    <>
      {gifName.map((name, index) => (
        <div key={name}>
          <Button onClick={() => clickAction(index)}>{name}</Button>
        </div>
      ))}

      <div>
        <div className={` ${selected !== null ? "block" : "hidden"}`}>
          {selected === null ? <></> : <Gif gifSorce={gifSorce[selected]} />}
        </div>
      </div>
    </>
  );
};

export default Stamp;
