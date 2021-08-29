import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import {
  auth,
  FirebaseTimestamp,
  db,
  storage,
} from "../../src/firebase/firebase";
import Router from "next/router";

export type userState = {
  user: {
    uid: string;
    username: string;
    email: string;
    isSignedIn: boolean;
    image: {
      id: string;
      path: string;
    };
  };
};

export const initialState: userState = {
  user: {
    uid: "",
    username: "",
    email: "",
    isSignedIn: false,
    image: {
      id: "",
      path: "",
    },
  },
};
type fetchuser = {
  email: string;
  password: string;
};

type adduser = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type userimage = {
  uid: string;
  image: {
    id: string;
    path: string;
  };
};

export const deleteUserImage = createAsyncThunk(
  "user/deleteUserImage",
  async (deleteuserimage: userimage) => {
    const uid = deleteuserimage.uid;
    const image = deleteuserimage.image;

    storage.ref("images").child(image.id).delete();

    const data: any = await (
      await db.collection("users").doc(uid).get()
    ).data();
    const timestamp = FirebaseTimestamp.now();

    const userUpdateData = {
      updated_at: timestamp,
      image: {
        id: "",
        path: "",
      },
    };

    db.collection("users")
      .doc(uid)
      .set(userUpdateData, { merge: true })
      .then(() => {
        console.log("更新完了");
      });

    return {
      uid: uid,
      username: data.username,
      email: data.email,
      image: {
        id: "",
        path: "",
      },
      isSignedIn: true,
    };
  }
);

export const addUserImage = createAsyncThunk(
  "user/addUserImage",
  async (adduserimage: userimage) => {
    const uid = adduserimage.uid;
    const image = adduserimage.image;

    const data: any = await (
      await db.collection("users").doc(uid).get()
    ).data();
    const timestamp = FirebaseTimestamp.now();

    const userUpdateData = {
      updated_at: timestamp,
      image: image,
    };

    db.collection("users")
      .doc(uid)
      .set(userUpdateData, { merge: true })
      .then(() => {
        console.log("更新成功");
      });

    return {
      uid: uid,
      username: data.username,
      email: data.email,
      image: image,
      isSignedIn: true,
    };
  }
);

export const signOutUser = createAsyncThunk("user/signOutUser", async () => {
  auth.signOut();

  return {
    ...initialState.user,
  };
});

export const addUser = createAsyncThunk(
  "user/addUser",
  async (adduser: adduser) => {
    // validation
    const { username, email, password, confirmPassword } = adduser;
    // if (username === '' || email === '' || password === '' || confirmPassword === ''){
    //     alert('必須項目が未入力です')
    //     return false
    // }

    // if (password !== confirmPassword){
    //     alert('パスワードが一致していません')
    //     return false
    // }

    auth.createUserWithEmailAndPassword(email, password).then((result) => {
      const user = result.user;

      if (user) {
        const uid = user.uid;
        const timestamp = FirebaseTimestamp.now();
        const userInitialData = {
          created_at: timestamp,
          email: email,
          uid: uid,
          updated_at: timestamp,
          username: username,
          image: {
            id: "",
            path: "",
          },
        };

        db.collection("users")
          .doc(uid)
          .set(userInitialData)
          .then(() => {
            console.log("登録成功");
          });
      }
    });

    // signupしたらsigninするようにする
    const response: any = await auth.signInWithEmailAndPassword(
      email,
      password
    );

    const uid = response.user.uid;
    const data: any = await (
      await db.collection("users").doc(uid).get()
    ).data();

    return {
      uid: uid,
      username: data.username,
      email: data.email,
      isSignedIn: true,
      image: {
        id: data.image.id,
        path: data.image.path,
      },
    };
  }
);

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (fetchuser: fetchuser) => {
    const { email, password } = fetchuser;

    //   if (email === '' || password === ''){
    //     alert('必須項目が未入力です')
    //     return false
    // }

    const response: any = await auth.signInWithEmailAndPassword(
      email,
      password
    );

    const uid = response.user.uid;
    const data: any = await (
      await db.collection("users").doc(uid).get()
    ).data();

    return {
      uid: uid,
      username: data.username,
      email: data.email,
      isSignedIn: true,
      image: {
        id: data.image.id,
        path: data.image.path,
      },
    };
  }
);

// State, Reducer, Action を一気に生成する
const userSlice = createSlice({
  name: "user", //スライスの名前を設定
  initialState, //stateの初期値を設定
  reducers: {
    updateUserState: (state: userState, action: any) => ({
      user: {
        ...action.payload,
      } /* もとの配列を展開して新しい配列を作る */,
    }),
  },
  extraReducers: (builder) => {
    builder.addCase(addUser.fulfilled, (state, action: any) => {
      state.user = action.payload; // payloadCreatorでreturnされた値
      alert("登録完了しました。");
      Router.push("/");
    });
    // fetchUserというcreateAsyncThunkが正常終了した場合のReducer
    builder.addCase(fetchUser.fulfilled, (state, action: any) => {
      state.user = action.payload; // payloadCreatorでreturnされた値
      alert("ログインしました。");
      Router.push("/");
    });
    builder.addCase(signOutUser.fulfilled, (state, action: any) => {
      state.user = action.payload;
      alert("サインアウトしました。");
      Router.push("/");
    });
    builder.addCase(addUserImage.fulfilled, (state, action: any) => {
      state.user = action.payload;
      alert("画像の登録が完了しました。");
    });
    builder.addCase(deleteUserImage.fulfilled, (state, action: any) => {
      state.user = action.payload;
      alert("画像の削除が完了しました。");
    });
  },
});

export const { updateUserState } = userSlice.actions;

export const getUser = (state: RootState) => state.user;

export default userSlice;
