import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { useDispatch, useSelector } from "react-redux";
import { PrimaryButton } from "../atoms";
import { getUser, signOutUser } from "../../../redux/slices/userSlice";
import Image from "next/image";
import Router from "next/router";
import { IconButton } from "@material-ui/core";

const AfterLoginButton = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser).user;

  const goToProfile = () => {
    Router.push("/users/profile");
  };

  return (
    <div className="flex items-center justify-evenly w-full ">
      {user.image.path !== "" ? (
        <div onClick={goToProfile} className="flex items-center">
          <Image
            className="rounded-full"
            src={user.image.path}
            alt="userProfileImage"
            width={48}
            height={48}
          />
        </div>
      ) : (
        <IconButton onClick={goToProfile}>
          <AccountCircleIcon />
        </IconButton>
      )}
      <PrimaryButton
        label={"sign out"}
        onClick={() => dispatch(signOutUser())}
      />
    </div>
  );
};
export default AfterLoginButton;
