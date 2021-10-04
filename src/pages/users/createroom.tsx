import {
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { useCallback, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { CommonInput, PrimaryButton } from "../../components/atoms";
import { useDispatch, useSelector } from "react-redux";
import { addroom, addRoom } from "../../../redux/slices/roomsSlice";
import { getUser } from "../../../redux/slices/userSlice";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 200,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

const CreateRoom = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector(getUser).user;
  const [language, setLanguage] = useState("");
  const [level, setLevel] = useState("");
  const [password, setPassword] = useState(null);
  const [description, setDescription] = useState("");

  const selectLang = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLanguage(event.target.value as string);
  };
  const selectLevel = (event: React.ChangeEvent<{ value: unknown }>) => {
    setLevel(event.target.value as string);
  };

  const [state, setState] = useState(true); // すぐに遊ぶ: true 友だちと遊ぶ: false
  const [disabled, setDisabled] = useState(false); // prevent mulitple times button press

  const handleChange = () => {
    setState(!state);
  };

  const inputPassword = useCallback(
    (event) => {
      setPassword(event.target.value);
    },
    [setPassword]
  );
  const inputDescription = useCallback(
    (event) => {
      setDescription(event.target.value);
    },
    [setDescription]
  );

  const addroom = {
    language: language,
    level: level,
    creator: user.uid,
    creatorName: user.username,
    creatorImage: user.image.path,
    password: password,
    description: description,
    nextTurn: "creator",
  };

  const validate = (addroom: addroom) => {
    if (addroom.language === "" || addroom.level === "") {
      alert("必須項目が未入力です");
      return false;
    } else if (!state && addroom.password === null) {
      alert("パスワードを入力してください");
      return false;
    } else if (disabled) {
      return;
    } else {
      setDisabled(true);
      dispatch(addRoom(addroom));
    }
  };

  return (
    <div className="w-screen h-screen">
      <h2 className="pt-16 text-center text-2xl font-bold">部屋を作成</h2>
      <div className="w-1/3 container mx-auto">
        <div className="h-16" />
        <div className="h-8 flex items-center justify-center">
          <FormControl className={classes.formControl} required={true}>
            <InputLabel id="demo-simple-select-label">language</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={language}
              onChange={selectLang}
            >
              <MenuItem value={"python"}>Python</MenuItem>
              <MenuItem value={"javascript"}>JavaScript</MenuItem>
              <MenuItem value={"c"}>C</MenuItem>
              <MenuItem value={"go"}>Go</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="h-8" />
        <div className="h-8 flex items-center justify-center">
          <FormControl className={classes.formControl} required={true}>
            <InputLabel id="demo-simple-select-label">level</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={level}
              onChange={selectLevel}
            >
              <MenuItem value={"easy"}>easy</MenuItem>
              <MenuItem value={"normal"}>normal</MenuItem>
              <MenuItem value={"difficult"}>difficult</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="h-16" />
        <div className="h-8 flex items-center justify-evenly">
          <FormControlLabel
            control={
              <Checkbox
                checked={state}
                onChange={handleChange}
                name="checkedA"
                color="primary"
              />
            }
            label="すぐに遊ぶ"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!state}
                onChange={handleChange}
                name="checkedB"
                color="primary"
              />
            }
            label="友だちと遊ぶ"
          />
        </div>
        <div className="h-8" />
        {!state && (
          <div className="flex items-center justify-evenly">
            <CommonInput
              fullWidth={false}
              label={"パスワード"}
              multiline={false}
              required={true}
              rows={1}
              value={password}
              type="text"
              onChange={inputPassword}
            />
          </div>
        )}
        <div className="h-8" />
        <div className="flex items-center justify-evenly">
          <CommonInput
            fullWidth={false}
            label={"説明"}
            multiline={true}
            required={false}
            rows={5}
            value={description}
            type="text"
            onChange={inputDescription}
          />
        </div>
        <div className="h-8" />
        <div className="flex items-center justify-center">
          <PrimaryButton
            label={"部屋を作成する"}
            onClick={() => validate(addroom)}
          />
        </div>
        <div className="h-8" />
      </div>
    </div>
  );
};
export default CreateRoom;
