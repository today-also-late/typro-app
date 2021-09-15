import router from "next/router";
import Router from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { db } from "../../firebase/firebase";

const WaitingRoom = () => {
  const dispatch = useDispatch();
  const roomId: any = router.query["roomId"];

  useEffect(() => {
    const unsubscribeRoom = db
      .collection("rooms")
      .doc(roomId)
      .onSnapshot((snapshot) => {
        const data: any = snapshot.data();
        if (data.participant) {
          Router.push({
            pathname: "/users/coopplay",
            query: {
              language: data.language,
              level: data.level,
              count: 1,
              roomId: data.roomId,
            },
          });
        }
      });
    return () => unsubscribeRoom();
  }, []);
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="pt-16 text-center text-4xl">
        <p>協力相手が参加するまでしばらくお待ち下さい</p>
      </div>
    </div>
  );
};
export default WaitingRoom;
