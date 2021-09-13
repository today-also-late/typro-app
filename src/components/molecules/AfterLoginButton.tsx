import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
// import { DropdownButtun } from "../atoms";
import { getUser, signOutUser } from "../../../redux/slices/userSlice";
import Image from "next/image";
import Router from "next/router";
import { IconButton } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import NoProfileImage from "../../../public/images/no-profile.png";
import { DropdownIcon } from "../atoms";

const AfterLoginButton = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser).user;

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  // クッリク時にドロップダウンを表示
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // ドロップダウンメニューを閉じる
  const handleClose = () => {
    setAnchorEl(null);
  };

  const goToProfile = () => {
    Router.push("/users/profile");
    handleClose();
  };

  return (
    <div className="flex items-center justify-end w-full">
      {user.image.path !== "" ? (
        <IconButton onClick={handleClick}>
          <Image
            className="rounded-full"
            src={user.image.path}
            alt="userProfileImage"
            width={48}
            height={48}
          />
          <DropdownIcon />
        </IconButton>
      ) : (
        <div>
          <IconButton onClick={handleClick}>
            <AccountCircleIcon />
            <DropdownIcon />
          </IconButton>
        </div>
      )}
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <div className="mx-12 mt-2 flex items-center justify-evenly">
          {user.image.path !== "" ? (
            <Image
              className="rounded-full"
              src={user.image.path}
              alt="userProfileImage"
              width={56}
              height={56}
            />
          ) : (
            <Image
              className="rounded-full"
              src={NoProfileImage}
              alt="NoProfileImage"
              width={56}
              height={56}
            />
          )}
        </div>
        <h3 className="text-xl flex items-center justify-evenly border-b mx-2 my-1 border-gray-400">
          {user.username}
        </h3>
        <MenuItem onClick={goToProfile}>Profile</MenuItem>
        <MenuItem
          onClick={() => {
            dispatch(signOutUser());
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
};
export default AfterLoginButton;
