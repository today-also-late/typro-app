import React from "react";
import Button from "@material-ui/core/Button";

const PrimaryButton = (props: any) => {
  return (
    <Button color="primary" variant="contained" onClick={() => props.onClick()}>
      {props.label}
    </Button>
  );
};

export default PrimaryButton;
