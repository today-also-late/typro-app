import React, { useState, useEffect } from "react";
import Gif from "../atoms/Gif";
import fight from "../../../public/images/stamp/fight.gif";
import nicePlay from "../../../public/images/stamp/niceplay.gif";
import osii from "../../../public/images/stamp/osii.gif";
import genius from "../../../public/images/stamp/genius.gif";
import { Button } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import router from "next/router";
import { db } from "../../firebase/firebase";
import { useSelector } from "react-redux";
import { getUser } from "../../../redux/slices/userSlice";

const Stamp = () => {
  const user = useSelector(getUser).user;
  const roomId: any = router.query["roomId"];
  const [isCreater, setIsCreater] = useState(false);
  const [isParticipant, setIsParticipant] = useState(false);
  const [createrName, setCreaterName] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [createrSelected, setCreaterSelected] = useState<null | number>(null);
  const [participantSelected, setParticipantSelected] = useState<null | number>(
    null
  );
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    db.collection("rooms")
      .doc(roomId)
      .update({ createrSelected: createrSelected });
  }, [createrSelected]);

  useEffect(() => {
    db.collection("rooms")
      .doc(roomId)
      .update({ participantSelected: participantSelected });
  }, [participantSelected]);

  useEffect(() => {
    const nowUser = db
      .collection("rooms")
      .doc(roomId)
      .onSnapshot((snapshot) => {
        const data: any = snapshot.data();
        if (data.creator == user.uid) {
          setCreaterName(data.createrName);
          setIsCreater(true);
          setParticipantSelected(data.participantSelected);
        }
        if (data.participant == user.uid) {
          setParticipantName(data.participantName);
          setIsParticipant(true);
          setCreaterSelected(data.createrSelected);
        }
        return () => nowUser();
      });
  }, []);

  const clickAction = (index: null | number) => {
    isCreater == true
      ? setCreaterSelected(index)
      : setParticipantSelected(index);
    handleClose();
    setTimeout(toNull, 5000);
  };

  const toNull = () => {
    isCreater == true ? setCreaterSelected(null) : setParticipantSelected(null);
  };

  const gifName = ["ファイト", "ナイスプレイ", "おしい", "天才か？"];
  const gifSorce = [fight, nicePlay, osii, genius];

  return (
    <div className="w-full">
      {/* ドロップダウンボタン */}
      <div className="text-center mt-12">
        <Button
          id="basic-button"
          variant="contained"
          aria-controls="basic-menu"
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          スタンプを送る
        </Button>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {gifName.map((name, index) => (
            <div key={name} className="text-center">
              <MenuItem onClick={() => clickAction(index)}>{name}</MenuItem>
            </div>
          ))}
        </Menu>
      </div>

      <div>
        <div className="text-right mr-16">
          <p>{createrName}</p>
          <div className={` ${createrSelected !== null ? "block" : "hidden"}`}>
            {createrSelected === null ? (
              <></>
            ) : (
              <Gif gifSorce={gifSorce[createrSelected]} />
            )}
          </div>
        </div>
        <div className="text-left ml-16">
          <p>{participantName}</p>
          <div
            className={` ${participantSelected !== null ? "block" : "hidden"}`}
          >
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
function useMount(arg0: () => void, arg1: never[]) {
  throw new Error("Function not implemented.");
}
