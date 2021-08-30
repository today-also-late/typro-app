import TyproLogoImage from "../../../public/images/typro-logo.png";
import Image from "next/image";

const TyproLogo = () => {
  return (
    <Image
      className="rounded-full"
      src={TyproLogoImage}
      alt="TyproLogoImage"
      width={48}
      height={48}
    />
  );
};
export default TyproLogo;
