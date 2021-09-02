import TyproLogoImage from "../../../public/images/typro-logo.png";
import Image from "next/image";
import Link from "next/link";

const TyproLogo = () => {
  return (
    <Link href="/">
      <Image
        className="rounded-full"
        src={TyproLogoImage}
        alt="TyproLogoImage"
        width={48}
        height={48}
      />
    </Link>
  );
};
export default TyproLogo;
