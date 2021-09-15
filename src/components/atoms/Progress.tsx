import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      "& > * + *": {
        marginLeft: theme.spacing(2),
      },
    },
  })
);

const Progress = (props: any) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress size={props.size} />
    </div>
  );
};
export default Progress;
