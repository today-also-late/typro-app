import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../redux/slices/userSlice";
import { Label, PrimaryButton } from "../atoms/index";
import TyproLogo from "../atoms/TyproLogo";
import { AfterLoginButton, BeforeLoginButton } from "../molecules/index";
import { ClosableDrawer } from "../molecules";
type PROPS = {};

const Header: React.FC<PROPS> = () => {
  const user = useSelector(getUser).user;
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = useCallback(
    (event: any) => {
      setOpen(!open);
    },
    [setOpen, open]
  );
  return (
    <div className="w-screen fixed flex items-center h-16 bg-gray-400">
      <div className="flex items-center w-1/10">
        <TyproLogo />
      </div>
      <div className="flex justify-evenly w-1/2 items-center">
        <Label labelText="TyPro" href={"/"} />
        <Label labelText="概要" href={"/outline"} />
        <Label labelText="問題" href={"/users/selectlanguage"} />
        <PrimaryButton
          label={"ランキング"}
          onClick={(e: any) => handleDrawerToggle(e)}
        />
        <Label labelText="投稿" href={"/users/submit"} />
      </div>
      <div className="w-1/5">
        <ClosableDrawer open={open} onClose={handleDrawerToggle} />
      </div>
      <div className="flex items-center justify-evenly w-1/5">
        {user.isSignedIn ? <AfterLoginButton /> : <BeforeLoginButton />}
      </div>
    </div>
  );
};

export default Header;
