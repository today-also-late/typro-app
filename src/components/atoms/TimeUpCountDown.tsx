import * as React from "react";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  typo: {
    color: "black",
    props: {
      color: "red",
    },
  },
});

const CircularProgressWithLabel = (
  props: CircularProgressProps & { value: number }
) => {
  const classes = useStyles();
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress
        variant="determinate"
        {...props}
        size={160}
        color={
          props.value >= 20
            ? "primary"
            : props.value >= 10
            ? "warning"
            : "error"
        }
      />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          // className={classes.typo}
          variant="caption"
          component="div"
          fontSize={40}
          // color={props.value > 0 ? "text.secondary" : "text.primary"}
        >
          <p
            className={
              props.value >= 20
                ? "text-gray-600"
                : props.value >= 10
                ? "text-yellow-500"
                : "text-red-500"
            }
          >
            {props.value > 0 ? Math.round(props.value) : "急げ！"}
          </p>
        </Typography>
      </Box>
    </Box>
  );
};

const TimeUpCountDown = (props: any) => {
  // const questionLength = props.question.length;
  const [progress, setProgress] = useState<number>(30);

  useEffect(() => {
    if (typeof props.question == "string") {
      setProgress(props.question.length * 2);
    }
    if (typeof props.question == "number") {
      setProgress(props.question);
    }
  }, [props.question]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => (prevProgress > 0 ? prevProgress - 1 : 0));
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return <CircularProgressWithLabel value={progress} />;
};
export default TimeUpCountDown;
