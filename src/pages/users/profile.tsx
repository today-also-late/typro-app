import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../redux/slices/userSlice";
import ImageArea from "../../components/molecules/ImageArea";
import {
  fetchPythonScore,
  fetchJavascriptScore,
} from "../../../redux/slices/scoreSlice";
import { getScore } from "../../../redux/slices/scoreSlice";
import ScoreChart from "../../components/organisms/ScoreChart";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser).user;
  const [image, setImage] = useState({ id: "", path: "" });
  const scores = useSelector(getScore).score;
  const [pythonLevel, setPythonLevel] = useState("easy");
  const [javascriptLevel, setJavascriptLevel] = useState("easy");

  useEffect(() => {
    if (user.image.path) {
      setImage(user.image);
    }
  }, [user.image]);

  useEffect(() => {
    dispatch(
      fetchPythonScore({
        uid: user.uid,
        level: pythonLevel,
      })
    );
  }, [dispatch, user.uid, pythonLevel]);

  useEffect(() => {
    dispatch(
      fetchJavascriptScore({
        uid: user.uid,
        level: javascriptLevel,
      })
    );
  }, [dispatch, user.uid, javascriptLevel]);

  return (
    <>
      <section className="w-full h-full flex items-center justify-center">
        {user && (
          <div className="">
            <ImageArea image={image} setImage={setImage} required={true} />

            <div className="text-center">
              <h2 className="text-5xl">{user.username}</h2>
              <p>{user.email}</p>
            </div>
          </div>
        )}
      </section>
      <ScoreChart
        scores={scores}
        pythonLevel={pythonLevel}
        javascriptLevel={javascriptLevel}
        setPythonLevel={setPythonLevel}
        setJavascriptLevel={setJavascriptLevel}
      />
    </>
  );
};
export default Profile;
