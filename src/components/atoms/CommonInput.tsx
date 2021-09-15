import React from "react";
import TextField from "@material-ui/core/TextField";

type TextField = {
  fullWidth: boolean;
  label: string;
  autoFocus?: boolean;
  margin?: string;
  multiline: boolean;
  required: boolean;
  rows: number;
  value: string | null;
  type: string;
  variant?: string;
  onChange: React.ChangeEventHandler;
  onBlur?: React.FocusEventHandler;
  error?: boolean;
  helperText?: string;
  onKeyDown?: React.KeyboardEventHandler;
};

const CommonInput = (props: TextField) => {
  return (
    <TextField
      className=""
      label={props.label}
      fullWidth={props.fullWidth}
      autoFocus={props.autoFocus}
      margin="dense"
      multiline={props.multiline}
      required={props.required}
      rows={props.rows}
      value={props.value}
      type={props.type}
      variant={"outlined"}
      onChange={props.onChange}
      onBlur={props.onBlur}
      error={props.error}
      helperText={props.helperText}
      onKeyDown={props.onKeyDown}
    />
  );
};

export default CommonInput;
