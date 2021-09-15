import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import roomsSlice, {
  fetchRooms,
  getRooms,
  RoomsState,
  updateRooms,
} from "../../../redux/slices/roomsSlice";
import { getUser } from "../../../redux/slices/userSlice";
import { ContainedButton } from "../../components/atoms";
import { Room } from "../../components/organisms";
import { db } from "../../firebase/firebase";

const SelectRoom = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser).user;
  const rooms: Array<any> = useSelector(getRooms).rooms;

  useEffect(() => {
    dispatch(fetchRooms(user.uid));
  }, []);

  return (
    <div className="w-full h-screen">
      <div className="w-full h-2/6 flex items-center justify-center">
        <ContainedButton label="部屋を作成する" href="/users/createroom" />
      </div>
      <div className="h-2/6 flex items-center justify-evenly">
        {rooms.length > 0 &&
          rooms.map((room: any, index: number) => (
            <div key={index}>
              <Room
                roomId={room.roomId}
                creatorName={room.creatorName}
                language={room.language}
                level={room.level}
                password={room.password}
                description={room.description}
              />
            </div>
          ))}
      </div>
      <div className="h-2/6"></div>
    </div>
  );
};
export default SelectRoom;
