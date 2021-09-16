import Gu from "../../../public/images/gu.png";
import Image from "next/image";
import Link from "next/link";

const GuLogo = () => {
  return (
    <Link href="/">
      <Image
        // className="rounded-full"
        src={Gu}
        alt="gu-logo"
        width={160}
        height={160}
      />
    </Link>
  );
};
export default GuLogo;
