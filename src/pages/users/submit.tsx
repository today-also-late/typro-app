import React, { useState } from "react";
import { CommonInput, PrimaryButton } from "../../components/atoms";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { getUser } from "../../../redux/slices/userSlice";
import AlertDialog from "../../components/molecules/ AlertDialog";

const Submit = () => {
  const user = useSelector(getUser).user;

  const [language, setLanguage] = useState("");
  const [src, setSrc] = useState("");
  const [output, setOutput] = useState("");

  // AlertDialog
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // バリデーション
  const validateRequiredInput = (...args: any) => {
    let isBlank = false;
    for (let i = 0; i < args.length; i = (i + 1) | 0) {
      if (args[i] === "") {
        isBlank = true;
      }
    }
    return isBlank;
  };
  // (...args)は引数をいくらでも受け取れる
  const inputLang = useCallback(
    (event) => {
      setLanguage(event.target.value);
    },
    [setLanguage]
  );

  const inputSrc = useCallback(
    (event) => {
      setSrc(event.target.value);
    },
    [setSrc]
  );
  const inputOutput = useCallback(
    (event) => {
      setOutput(event.target.value);
    },
    [setOutput]
  );

  const submitForm = () => {
    const isBlank = validateRequiredInput(language, src, output);
    handleClose();

    if (isBlank) {
      alert("入力必須欄が空白です。");
      return false;
    } else {
      const payload = {
        text:
          "投稿がありました\n" +
          "uid: " +
          user.uid +
          "\n" +
          "name: " +
          user.username +
          "\n" +
          "email: " +
          user.email +
          "\n" +
          "language: \n" +
          language +
          "\n" +
          "src: \n" +
          src +
          "\n" +
          "output: \n" +
          output,
      };

      const url =
        "https://hooks.slack.com/services/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";

      fetch(url, {
        method: "POST",
        body: JSON.stringify(payload),
      }).then(() => {
        alert("送信が完了しました!!");

        setSrc("");
        setOutput("");
        setLanguage("");
      });
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="pt-12 w-1/2 ">
        <div className="text-center text-2xl font-bold">問題が投稿できます</div>
        <div className="mt-8">
          <CommonInput
            fullWidth={true}
            label={"プログラミング言語(必須)"}
            multiline={true}
            rows={1}
            value={language}
            type={"description"}
            required={true}
            onChange={inputLang}
          />
        </div>
        <div className="mt-8">
          <CommonInput
            fullWidth={true}
            label={"入力してもらうコード(必須)"}
            multiline={true}
            rows={20}
            value={src}
            type={"description"}
            required={true}
            onChange={inputSrc}
          />
        </div>
        <div className="mt-8">
          <CommonInput
            fullWidth={true}
            label={"出力(必須)"}
            multiline={false}
            rows={1}
            value={output}
            type={"description"}
            required={true}
            onChange={inputOutput}
          />
        </div>
        <div className="mt-8 text-center">
          <AlertDialog
            label="送信する"
            title="本当に送信しますか？"
            content="送信した内容は、TyPro管理者が確認してから問題に反映されます。"
            color="primary"
            open={open}
            onClick={submitForm}
            onClose={handleClose}
            onClickOpen={handleClickOpen}
          />
        </div>
      </div>
    </div>
  );
};
export default Submit;
