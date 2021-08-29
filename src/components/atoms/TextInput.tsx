import React from "react";
import TextField from "@material-ui/core/TextField";

type TextField = {
  fullWidth: boolean;
  autoFocus?: boolean;
  label?: string;
  margin?: string;
  multiline: boolean;
  required: boolean;
  rows: number;
  value: string;
  type: string;
  variant?: string;
  onChange: React.ChangeEventHandler;
  onKeyDown: React.KeyboardEventHandler<HTMLDivElement>; // React.KeyboardEventHandlerだと'?'をつけるとエラーになるためanyにしている
};

const TextInput = (props: TextField) => {
  return (
    <TextField
      className=""
      fullWidth={props.fullWidth}
      autoFocus={props.autoFocus}
      label={props.label}
      margin="dense"
      multiline={props.multiline}
      required={props.required}
      rows={props.rows}
      value={props.value}
      type={props.type}
      variant="outlined"
      onChange={props.onChange}
      onKeyDown={(e) => props.onKeyDown(e)}
    />
  );
};

export default TextInput;
