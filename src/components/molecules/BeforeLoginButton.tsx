import { Button } from "../atoms";

const BeforeLoginButton = () => {
  return (
    <div className="flex justify-around">
      <Button buttonText="新規登録" href="/signup" />
      <div>&nbsp; &nbsp; &nbsp; &nbsp;</div>
      <Button buttonText="ログイン" href="/signin" />
    </div>
  );
};
export default BeforeLoginButton;
