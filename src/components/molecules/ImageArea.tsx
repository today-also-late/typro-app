import { IconButton, makeStyles } from "@material-ui/core";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { Dispatch, SetStateAction, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "../../firebase/firebase";
import ImagePreview from "../atoms/ImagePreview";
import { addUserImage, deleteUserImage } from "../../../redux/slices/userSlice";
import { getUser } from "../../../redux/slices/userSlice";

type PROPS = {
  image: {
    id: string;
    path: string;
  };
  setImage: Dispatch<SetStateAction<{ id: string; path: string }>>;
  required: boolean;
};

const ImageArea = (props: PROPS) => {
  const dispatch = useDispatch();
  const user = useSelector(getUser).user;
  const image = props.image;

  // Cloud Storageに画像をアップ
  const uploadImage = useCallback(
    (event) => {
      const file = event.target.files;
      let blob = new Blob(file, { type: "image/jpeg" }); // CloudStorageにアップするためにBlobを使う

      // genetrate random 16 digits strings
      const S =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const N = 16;
      const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))) //file名をランダムにする
        .map((n) => S[n % S.length])
        .join("");

      const uploadRef = storage.ref("images").child(fileName);
      const uploadTask = uploadRef.put(blob);

      uploadTask.then(() => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          const newImage = { id: fileName, path: downloadURL };
          props.setImage(newImage);
          const adduserimage = {
            uid: user.uid,
            image: {
              id: fileName,
              path: downloadURL,
            },
          };
          dispatch(addUserImage(adduserimage));
        });
      });
    },
    [props.setImage]
  );

  const deleteImage = useCallback(
    async (deleteid) => {
      const ret = window.confirm("この画像を削除しますか？");
      if (!ret) {
        return false;
      } else {
        props.setImage({ id: "", path: "" });
        const deleteuserimage = {
          uid: user.uid,
          image: {
            id: deleteid,
            path: "",
          },
        };
        await dispatch(deleteUserImage(deleteuserimage));
      }
    },
    [props.image]
  );

  return (
    <div>
      <ImagePreview upload={uploadImage} delete={deleteImage} image={image} />
    </div>
  );
};
export default ImageArea;
