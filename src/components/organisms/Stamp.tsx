import React, { useState, useEffect, useCallback } from "react";
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
import { CommonInput } from "../atoms";
import Image from "next/image";

const Stamp = () => {
  const user = useSelector(getUser).user;
  const roomId: any = router.query["roomId"];
  const [creatorChat, setCreatorChat] = useState<null | string>(null);
  const [participantChat, setParticipantChat] = useState<null | string>(null);
  const [isCreator, setIsCreator] = useState(false);
  const [isParticipant, setIsParticipant] = useState(false);
  const [creatorName, setCreatorName] = useState("");
  const [participantName, setParticipantName] = useState("");
  const [creatorImage, setCreatorImage] = useState("");
  const [participantImage, setParticipantImage] = useState("");
  const [creatorSelected, setCreatorSelected] = useState<null | number>(null);
  const [participantSelected, setParticipantSelected] = useState<null | number>(
    null
  );

  const inputCreatorChat = useCallback(
    (event: any) => {
      setCreatorChat(event.target.value);
    },
    [setCreatorChat]
  );

  const inputParticipantChat = useCallback(
    (event: any) => {
      setParticipantChat(event.target.value);
    },
    [setParticipantChat]
  );

  const sendCreatorChat = async (e: any) => {
    if (e.key === "Enter") {
      await db
        .collection("rooms")
        .doc(roomId)
        .update({ creatorChat: creatorChat });
      // setCreatorChat("");
    }
  };
  const sendParticipantChat = async (e: any) => {
    if (e.key === "Enter") {
      await db
        .collection("rooms")
        .doc(roomId)
        .update({ participantChat: participantChat });
      // setParticipantChat("");
    }
  };

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
      .update({ creatorSelected: creatorSelected });
  }, [creatorSelected]);

  useEffect(() => {
    db.collection("rooms")
      .doc(roomId)
      .update({ participantSelected: participantSelected });
  }, [participantSelected]);

  useEffect(() => {
    const unsubscribeRoom = db
      .collection("rooms")
      .doc(roomId)
      .onSnapshot((snapshot) => {
        const data: any = snapshot.data();
        if (data.creator == user.uid) {
          setIsCreator(true);
          setParticipantSelected(data.participantSelected);
          setParticipantChat(data.participantChat);
        }
        if (data.participant == user.uid) {
          setIsCreator(false);
          setCreatorSelected(data.creatorSelected);
          setCreatorChat(data.creatorChat);
        }

        setCreatorName(data.creatorName);
        setParticipantName(data.participantName);
        setCreatorImage(data.creatorImage);
        setParticipantImage(data.participantImage);

        if (data.isEnd) {
          return () => unsubscribeRoom();
        }
      });

    return () => unsubscribeRoom();
  }, []);

  const clickAction = (index: null | number) => {
    isCreator == true
      ? setCreatorSelected(index)
      : setParticipantSelected(index);
    handleClose();
    setTimeout(toNull, 5000);
  };

  const toNull = () => {
    isCreator == true ? setCreatorSelected(null) : setParticipantSelected(null);
  };

  const gifName = ["ファイト", "ナイスプレイ", "おしい", "天才か？"];
  const gifSorce = [fight, nicePlay, osii, genius];

  return (
    <div className="w-full">
      <div className="flex pt-12">
        <div className="w-1/3 text-center">
          <p className="">{creatorName}</p>
          {creatorImage !== "" ? (
            <Image
              className="rounded-full"
              src={creatorImage}
              alt="userProfileImage"
              width={48}
              height={48}
            />
          ) : (
            <></>
          )}
          <div className={` ${creatorChat !== null ? "block" : "hidden"}`}>
            {creatorChat === null ? <></> : <p>{creatorChat}</p>}
          </div>
          <div className={` ${creatorSelected !== null ? "block" : "hidden"}`}>
            {creatorSelected === null ? (
              <></>
            ) : (
              <Gif gifSorce={gifSorce[creatorSelected]} />
            )}
          </div>
        </div>
        {/* ドロップダウンボタン */}
        <div className="w-1/3 text-center">
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
            <MenuItem>
              {isCreator ? (
                <CommonInput
                  fullWidth={true}
                  autoFocus={false}
                  label="チャット"
                  multiline={false}
                  required={true}
                  rows={1}
                  value={creatorChat}
                  type="text"
                  onChange={inputCreatorChat}
                  onKeyDown={(e) => sendCreatorChat(e)}
                />
              ) : (
                <CommonInput
                  fullWidth={true}
                  autoFocus={false}
                  label="チャット"
                  multiline={false}
                  required={true}
                  rows={1}
                  value={participantChat}
                  type="text"
                  onChange={inputParticipantChat}
                  onKeyDown={(e) => sendParticipantChat(e)}
                />
              )}
            </MenuItem>
          </Menu>
        </div>

        <div className="w-1/3 text-center">
          <p>{participantName}</p>
          {participantImage !== "" ? (
            <Image
              className="rounded-full"
              src={participantImage}
              alt="userProfileImage"
              width={48}
              height={48}
            />
          ) : (
            <></>
          )}
          <div className={` ${participantChat !== null ? "block" : "hidden"}`}>
            {participantChat === null ? <></> : <p>{participantChat}</p>}
          </div>
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
