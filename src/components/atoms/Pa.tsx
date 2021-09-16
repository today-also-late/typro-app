import Pa from "../../../public/images/pa.png";
import Image from "next/image";
import Link from "next/link";

const PaLogo = () => {
  return (
    <Link href="/">
      <Image
        // className="rounded-full"
        src={Pa}
        alt="pa-logo"
        width={160}
        height={160}
      />
    </Link>
  );
};
export default PaLogo;
