import GoSvg from "../../../public/images/gopher.svg";
import Image from "next/image";
import Link from "next/link";

const GoLogo = () => {
  return (
    <Link href="/">
      <Image
        // className="rounded-full"
        src={GoSvg}
        alt="c-logo"
        width={160}
        height={160}
      />
    </Link>
  );
};
export default GoLogo;
