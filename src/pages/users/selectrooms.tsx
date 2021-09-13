import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRooms,
  getRooms,
  RoomsState,
  updateRooms,
} from "../../../redux/slices/roomsSlice";
import { getUser } from "../../../redux/slices/userSlice";
import { Room } from "../../components/organisms/";
import { db } from "../../firebase/firebase";

const SelectRooms = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser).user;
  let rooms: Array<any> = useSelector(getRooms).rooms;

  useEffect(() => {
    dispatch(fetchRooms(user.uid));
    // const unsubscribeRooms = db.collection("rooms").onSnapshot((snapshots) => {
    //   snapshots.docChanges().forEach((change) => {
    //     const room: any = change.doc.data();
    //     const changeType = change.type;

    //     switch (changeType) {
    //       case "added":
    //         rooms.push(room);
    //         break;
    //       case "modified":
    //         const index = rooms.findIndex(
    //           (room: any) => room.roomId === change.doc.id
    //         );
    //         rooms[index] = room;
    //         break;
    //       case "removed":
    //         rooms = rooms.filter((room: any) => room.roomId !== change.doc.id);
    //         break;
    //       default:
    //         break;
    //     }
    //   });

    //   dispatch(updateRooms(rooms));

    //   return () => unsubscribeRooms();
    // });
  }, []);

  return (
    <div className="w-full h-screen flex items-center justify-evenly">
      {rooms.length > 0 &&
        rooms.map((room: any, index: number) => (
          <div key={index}>
            <Room
              roomId={room.roomId}
              creator={room.creator}
              language={room.language}
              level={room.level}
            />
          </div>
        ))}
    </div>
  );
};
export default SelectRooms;
