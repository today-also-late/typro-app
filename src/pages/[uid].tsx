import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  fetchJavascriptScore,
  fetchPythonScore,
  getScore,
} from "../../redux/slices/scoreSlice";
import { ScoreChart } from "../components/organisms";
import { db } from "../firebase/firebase";
import Image from "next/image";
import NoProfileImage from "../../public/images/no-profile.png";

// このページをpublicにするなら
// あとからファイル名を[username].tsxにするかも

//進捗情報などを公開したい場合など
type User = {
  uid: string;
  username: string;
  image: {
    id: string;
    path: string;
  };
};

const AnotherProfile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { uid } = router.query;
  const [user, setUser] = useState<User>({
    uid: "",
    username: "",
    image: {
      id: "",
      path: "",
    },
  });
  const scores = useSelector(getScore).score;
  const [pythonLevel, setPythonLevel] = useState("easy");
  const [javascriptLevel, setJavascriptLevel] = useState("easy");

  useEffect(() => {
    if (uid && typeof uid == "string") {
      const fetchUserByUid = async () => {
        await db
          .collection("users")
          .doc(uid)
          .get()
          .then((snapshot) => {
            const data: any = snapshot.data();
            setUser({
              uid: uid,
              username: data.username,
              image: {
                id: data.image.id,
                path: data.image.path,
              },
            });
          })
          .catch((e) => {
            router.push("/");
          });
      };
      fetchUserByUid();
    }
  }, [uid, router]);

  useEffect(() => {
    if (user.uid) {
      dispatch(
        fetchPythonScore({
          uid: user.uid,
          level: pythonLevel,
        })
      );
    }
  }, [dispatch, user.uid, pythonLevel]);

  useEffect(() => {
    if (user.uid) {
      dispatch(
        fetchJavascriptScore({
          uid: user.uid,
          level: javascriptLevel,
        })
      );
    }
  }, [dispatch, user.uid, javascriptLevel]);

  return (
    <>
      <section className="w-full h-full flex items-center justify-center">
        {user && (
          <div className="pt-8">
            {user.image.path ? (
              <Image
                className="rounded-full"
                src={user.image.path}
                alt="userProfileImage"
                width={220}
                height={215}
              />
            ) : (
              <Image
                className="rounded-full"
                src={NoProfileImage}
                alt="NoProfileImage"
                width={220}
                height={215}
              />
            )}

            <div className="text-center">
              <h2 className="text-5xl">{user.username}</h2>
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
export default AnotherProfile;
