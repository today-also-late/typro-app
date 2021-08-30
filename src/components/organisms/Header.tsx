import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../redux/slices/userSlice";
import { Label } from "../atoms/index";
import TyproLogo from "../atoms/TyproLogo";
import { AfterLoginButton, BeforeLoginButton } from "../molecules/index";

type PROPS = {};

const Header: React.FC<PROPS> = () => {
  const user = useSelector(getUser).user;

  return (
    <div className="w-screen fixed flex items-center h-16 bg-gray-400">
      <div className="flex items-center w-1/10">
        <TyproLogo />
      </div>
      <div className="flex justify-evenly w-1/2">
        <Label labelText="TyPro" href={"/"} />
        <Label labelText="概要" href={"/outline"} />
        <Label labelText="問題" href={"/users/selectlanguage"} />
        <Label labelText="ランキング" href={"/"} />
        <Label labelText="投稿" href={"/"} />
      </div>
      <div className="w-1/5"></div>
      <div className="w-1/5">
        {user.isSignedIn ? <AfterLoginButton /> : <BeforeLoginButton />}
      </div>
    </div>
  );
};

export default Header;
