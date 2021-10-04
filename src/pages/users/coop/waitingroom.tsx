import router, { useRouter } from "next/router";
import Router from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { deleteRoom } from "../../../../redux/slices/roomsSlice";
import { PrimaryButton, Progress } from "../../../components/atoms";
import { db } from "../../../firebase/firebase";

const WaitingRoom = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const roomId: any = router.query["roomId"];
  const cancel = () => {
    dispatch(deleteRoom(roomId));
    router.push("/");
  };

  useEffect(() => {
    const unsubscribeRoom = db
      .collection("rooms")
      .doc(roomId)
      .onSnapshot((snapshot) => {
        const data: any = snapshot.data();
        if (data.participant) {
          Router.push({
            pathname: "/users/coop/countdown",
            query: {
              language: data.language,
              level: data.level,
              count: 1,
              roomId: roomId,
            },
          });
        }
      });
    return () => unsubscribeRoom();
  }, []);

  useEffect(() => {
    // リロード,タブを閉じるときに警告(禁止はできない)
    window.addEventListener("beforeunload", onUnload);
    return () => {
      // イベントの設定解除
      window.removeEventListener("beforeunload", onUnload);
    };
  }, []);

  const onUnload = (e: any) => {
    e.preventDefault();
    e.returnValue = "";
  };

  return (
    <div className="w-full h-screen bg-gray-200">
      <div className="h-2/6 flex items-center justify-center">
        <div className="text-3xl">
          協力相手が参加するまでしばらくお待ち下さい
        </div>
      </div>
      <div className="h-2/6 flex items-center justify-center">
        <Progress size={80} />
      </div>
      <div className="h-2/6 flex items-center justify-center">
        <PrimaryButton label={"キャンセル"} onClick={() => cancel()} />
      </div>
    </div>
  );
};
export default WaitingRoom;
