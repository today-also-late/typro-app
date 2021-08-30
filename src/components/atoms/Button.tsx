import React from "react";
import Link from "next/link";

type PROPS = {
  buttonText: string;
  href: string;
};

const Button: React.FC<PROPS> = (props) => {
  return (
    <button className="border w-20 rounded-md font-bold h-8 shadow  text-white text-xs">
      <Link href={props.href}>{props.buttonText}</Link>
    </button>
  );
};
export default Button;
