import GoSvg from "../../../public/images/gopher.svg";
import Image from "next/image";

const GoLogo = () => {
  return <Image src={GoSvg} alt="c-logo" width={160} height={160} />;
};
export default GoLogo;
