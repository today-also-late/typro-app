import TyproLogoImage from "../../../public/favicon.ico";
import Image from "next/image";
import Link from "next/link";

const TyproLogo = () => {
  return (
    <Link href="/">
      <Image
        className=""
        src={TyproLogoImage}
        alt="TyproLogoImage"
        width={36}
        height={36}
      />
    </Link>
  );
};
export default TyproLogo;
