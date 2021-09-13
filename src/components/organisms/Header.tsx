import React from "react";
import { useSelector } from "react-redux";
import { getUser } from "../../../redux/slices/userSlice";
import { Label, PrimaryButton } from "../atoms/index";
import TyproLogo from "../atoms/TyproLogo";
import { AfterLoginButton, BeforeLoginButton } from "../molecules/index";
import { RankingDrawer } from "../molecules";
import { DropdownIcon } from "../atoms/DropdownIcon";

type PROPS = {};

const Header: React.FC<PROPS> = () => {
  const user = useSelector(getUser).user;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="w-screen fixed flex items-center h-16 bg-gray-400">
      <div className="flex items-center w-1/10">
        <TyproLogo />
      </div>
      <div className="flex justify-evenly w-1/2 items-center">
        <Label labelText="TyPro" href={"/"} />
        <Label labelText="概要" href={"/outline"} />
        <Label labelText="問題" href={"/users/selectlanguage"} />
        <div>
          <button onClick={handleClick} className="font-semibold text-white">
            ランキング
            <DropdownIcon />
          </button>
          <RankingDrawer
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          />
        </div>
        <Label labelText="投稿" href={"/users/submit"} />
      </div>
      <div className="w-1/5"></div>
      <div className="flex items-center justify-evenly w-1/5">
        {user.isSignedIn ? <AfterLoginButton /> : <BeforeLoginButton />}
      </div>
    </div>
  );
};

export default Header;
