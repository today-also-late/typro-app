import CSvg from "../../../public/images/c.svg";
import Image from "next/image";
import Link from "next/link";

const CLogo = () => {
  return (
    <Link href="/">
      <Image
        // className="rounded-full"
        src={CSvg}
        alt="c-logo"
        width={160}
        height={160}
      />
    </Link>
  );
};
export default CLogo;
