import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type Props = {
  label: string;
  title: string;
  content?: string;
  color?:
    | "inherit"
    | "primary"
    | "secondary"
    | "success"
    | "error"
    | "info"
    | "warning"
    | undefined;
  open: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  onClickOpen: React.MouseEventHandler<HTMLButtonElement>;
};

export default function AlertDialog(props: Props) {
  return (
    <div>
      <Button
        variant="contained"
        color={props.color}
        onClick={props.onClickOpen}
      >
        {props.label}
      </Button>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>いいえ</Button>
          <Button onClick={props.onClick} autoFocus>
            はい
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
