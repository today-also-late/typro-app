import React from "react";
import Link from "next/link";

type PROPS = {
  buttonText: string;
  href: string;
};

const Button: React.FC<PROPS> = (props) => {
  return (
    <button className="border w-36 rounded-md font-bold h-10 shadow  text-white">
      <Link href={props.href}>{props.buttonText}</Link>
    </button>
  );
};
export default Button;
