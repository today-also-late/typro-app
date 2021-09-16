import React from "react";
import Button from "@material-ui/core/Button";
import Link from "next/link";

type PROPS = {
  label: string;
  href: string;
};

const ContainedButton: React.FC<PROPS> = (props) => {
  return (
    <div className="items-center justify-center">
      <Button variant="outlined" color="primary">
        <Link href={props.href}>
          <div className="text-2xl">{props.label}</div>
        </Link>
      </Button>
    </div>
  );
};
export default ContainedButton;
