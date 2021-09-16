import { makeStyles } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { getUser } from "../../../redux/slices/userSlice";
import { LineChart } from "../../components/organisms/index";
import ImageArea from "../../components/molecules/ImageArea";
import {
  fetchPythonScore,
  fetchJavascriptScore,
} from "../../../redux/slices/scoreSlice";
import { getScore } from "../../../redux/slices/scoreSlice";

// このページをpublicにするなら
// あとからファイル名を[username].tsxにするかも

//進捗情報などを公開したい場合など

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(getUser).user;
  const [image, setImage] = useState({});
  const scores = useSelector(getScore).score;
  const [pythonLevel, setPythonLevel] = useState("easy");
  const [javascriptLevel, setJavascriptLevel] = useState("easy");

  useEffect(() => {
    if (user.image.path) {
      setImage(user.image);
    }
  }, []);

  useEffect(() => {
    dispatch(
      fetchPythonScore({
        uid: user.uid,
        level: pythonLevel,
      })
    );
  }, [pythonLevel]);

  useEffect(() => {
    dispatch(
      fetchJavascriptScore({
        uid: user.uid,
        level: javascriptLevel,
      })
    );
  }, [javascriptLevel]);

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
      <section className="flex justify-around">
        <LineChart
          title={"Python"}
          scores={scores.python}
          label={pythonLevel}
          setLevel={setPythonLevel}
        />
        <LineChart
          title={"JavaScript"}
          scores={scores.javascript}
          label={javascriptLevel}
          setLevel={setJavascriptLevel}
        />
      </section>
    </>
  );
};
export default Profile;
