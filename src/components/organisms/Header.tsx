import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../redux/slices/userSlice";
import { Label } from "../atoms/index";
import { AfterLoginButton, BeforeLoginButton } from "../molecules/index";

type PROPS = {};

const Header: React.FC<PROPS> = () => {
  const user = useSelector(getUser).user;

  return (
    <div className="w-screen fixed flex h-16 bg-gray-400">
      <div className="flex items-center justify-evenly w-2/5">
        <Label labelText="TyPro" href={"/"} />
        <Label labelText="概要" href={"/"} />
        <Label labelText="問題" href={"/users/selectlanguage"} />
        <Label labelText="ランキング" href={"/"} />
        <Label labelText="投稿" href={"/"} />
      </div>
      <div className="w-1/5"></div>
      <div className="flex items-center justify-evenly w-2/5">
        {user.isSignedIn ? <AfterLoginButton /> : <BeforeLoginButton />}
      </div>
    </div>
  );
};

export default Header;
