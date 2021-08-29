import React from "react";
import TextField from "@material-ui/core/TextField";

type TextField = {
  fullWidth: boolean;
  label: string;
  focus?: boolean;
  margin?: string;
  multiline: boolean;
  required: boolean;
  rows: number;
  value: string;
  type: string;
  variant?: string;
  onChange: React.ChangeEventHandler;
};

const CommonInput = (props: TextField) => {
  return (
    <TextField
      className=""
      label={props.label}
      fullWidth={props.fullWidth}
      autoFocus={props.focus}
      margin="dense"
      multiline={props.multiline}
      required={props.required}
      rows={props.rows}
      value={props.value}
      type={props.type}
      variant={"outlined"}
      onChange={props.onChange}
    />
  );
};

export default CommonInput;
