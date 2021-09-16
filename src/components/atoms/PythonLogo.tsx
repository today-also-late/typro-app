import pythonSvg from "../../../public/images/python.svg";
import Image from "next/image";

const PythonLogo = () => {
  return <Image src={pythonSvg} alt="python-logo" width={160} height={160} />;
};
export default PythonLogo;
