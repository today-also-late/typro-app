import React from "react";
import Link from "next/link";

type PROPS = {
  labelText: string;
  href: string;
  disabled?: boolean;
};

const Label: React.FC<PROPS> = (props) => {
  if (props.disabled) {
    return (
      <button className="text-uma-text1 font-bold block text-sm text-white hover:text-gray-600">
        {props.labelText}
      </button>
    );
  } else {
    return (
      <label className="text-uma-text1 font-bold block text-sm text-white hover:text-gray-600">
        <Link href={props.href}>{props.labelText}</Link>
      </label>
    );
  }
};

export default Label;
