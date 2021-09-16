import JsSvg from "../../../public/images/javascript.svg";
import Image from "next/image";
import Link from "next/link";

const JsLogo = () => {
  return (
    <Link href="/">
      <Image
        // className="rounded-full"
        src={JsSvg}
        alt="javascript-logo"
        width={160}
        height={160}
      />
    </Link>
  );
};
export default JsLogo;
