import React from "react";
import Button from "@material-ui/core/Button";

const PrimaryButton = (props: any) => {
  return (
    <Button
      color="primary"
      variant="outlined"
      onClick={() => props.onClick()}
      disabled={props.isDisabled}
    >
      {props.label}
    </Button>
  );
};

export default PrimaryButton;
