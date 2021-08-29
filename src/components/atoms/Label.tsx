import React from "react";
import Link from "next/link";

type PROPS = {
  labelText: string;
  href: string;
};

const Label: React.FC<PROPS> = (props) => {
  return (
    <label className="text-uma-text1 font-bold block text-sm text-white">
      <Link href={props.href}>{props.labelText}</Link>
    </label>
  );
};

export default Label;
