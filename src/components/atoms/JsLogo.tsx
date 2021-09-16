import JsSvg from "../../../public/images/javascript.svg";
import Image from "next/image";

const JsLogo = () => {
  return <Image src={JsSvg} alt="javascript-logo" width={160} height={160} />;
};
export default JsLogo;
