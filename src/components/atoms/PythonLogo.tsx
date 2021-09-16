import pythonSvg from "../../../public/images/python.svg";
import Image from "next/image";
import Link from "next/link";

const PythonLogo = () => {
  return (
    <Link href="/">
      <Image
        // className="rounded-full"
        src={pythonSvg}
        alt="python-logo"
        width={160}
        height={160}
      />
    </Link>
  );
};
export default PythonLogo;
