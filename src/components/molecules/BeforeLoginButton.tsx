import { Button } from "../atoms";

const BeforeLoginButton = () => {
  return (
    <div className="flex items-center justify-evenly w-2/5">
      <Button buttonText="新規登録" href="/signup" />
      <Button buttonText="ログイン" href="/signin" />
    </div>
  );
};
export default BeforeLoginButton;
