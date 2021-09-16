import Choki from "../../../public/images/choki.png";
import Image from "next/image";
import Link from "next/link";

const ChokiLogo = () => {
  return (
    <Link href="/">
      <Image
        // className="rounded-full"
        src={Choki}
        alt="choki-logo"
        width={160}
        height={160}
      />
    </Link>
  );
};
export default ChokiLogo;
