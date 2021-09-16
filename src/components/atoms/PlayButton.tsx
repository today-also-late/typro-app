import React from "react";
import Button from "@material-ui/core/Button";
import Link from "next/link";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Person from "@material-ui/icons/Person";
import Group from "@material-ui/icons/Group";

const useStyles = makeStyles({
  button: {
    // backgroundColor: "#e0e0e0",
    "&:hover": {
      background: "#0d47a1",
      color: "white",
    },
    width: 200,
    height: 110,
  },
});

const PlayButton = (props: any) => {
  const classes = useStyles();
  return (
    <div className="items-center justify-center">
      <Button
        className={classes.button}
        variant="outlined"
        color="primary"
        onClick={() => props.onClick()}
      >
        <div className="text-2xl">{props.label}</div>
        &nbsp;&nbsp;
        {props.isSignedIn && (props.person ? <Person /> : <Group />)}
      </Button>
    </div>
  );
};
export default PlayButton;
