import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Menu, MenuItem } from "@material-ui/core";
import { useCallback, useState } from "react";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import ForwardIcon from "@material-ui/icons/Forward";
import { CommonInput } from "../atoms";
import { useDispatch, useSelector } from "react-redux";
import { enterRoom } from "../../../redux/slices/roomsSlice";
import { getUser } from "../../../redux/slices/userSlice";

const useStyles = makeStyles({
  root: {
    width: 300,
    height: 270,
    backgroundColor: "#fafafa",
  },
  title: {
    fontSize: 16,
  },
  pos: {
    marginBottom: 12,
  },
  description: {
    height: 36,
  },
  button: {
    backgroundColor: "#e0e0e0",
    "&:hover": {
      background: "#bdbdbd",
    },
  },
});

const Room = (props: any) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [isMatch, setisMatch] = useState(true);
  const user = useSelector(getUser).user;

  const inputPassword = useCallback(
    (event) => {
      setisMatch(true);
      setPassword(event.target.value);
    },
    [setPassword]
  );

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const cetrificatePassword = (e: any) => {
    if (e.key === "Enter") {
      if (password == props.password) {
        dispatch(
          enterRoom({
            roomId: props.roomId,
            participant: user.uid,
          })
        );
      } else {
        setisMatch(false);
      }
    }
  };

  return (
    <div className="w-80 h-80">
      <Card className={classes.root}>
        <CardContent>
          <Typography className={classes.title}>
            部屋: {props.index + 1}
          </Typography>
          <Typography
            className={classes.pos}
            color="textSecondary"
            align="right"
          >
            作成者: {props.creatorName}
          </Typography>
          <Typography className={classes.pos} variant="h5" align="center">
            {props.language}
          </Typography>
          <Typography className={classes.pos} variant="h6" align="center">
            {props.level}
          </Typography>
          <Typography
            className={classes.description}
            variant="body2"
            align="center"
          >
            {props.description}
          </Typography>
        </CardContent>
        <CardActions>
          {props.password ? (
            <div className="ml-auto">
              <Button
                className={classes.button}
                size="small"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
              >
                <VpnKeyIcon />
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem>
                  <CommonInput
                    fullWidth={true}
                    autoFocus={true}
                    label="パスワード"
                    multiline={false}
                    required={true}
                    rows={1}
                    value={password}
                    type="password"
                    onChange={inputPassword}
                    onKeyDown={(e: any) => cetrificatePassword(e)}
                    error={!isMatch}
                    helperText={isMatch ? "" : "パスワードが違います"}
                  />
                </MenuItem>
              </Menu>
            </div>
          ) : (
            <div className="ml-auto">
              <Button
                className={classes.button}
                size="small"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={() =>
                  dispatch(
                    enterRoom({
                      roomId: props.roomId,
                      participant: user.uid,
                    })
                  )
                }
              >
                <ForwardIcon />
              </Button>
            </div>
          )}
        </CardActions>
      </Card>
    </div>
  );
};
export default Room;
