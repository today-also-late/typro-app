import React, { useState } from "react";
import { CommonInput, PrimaryButton } from "../../components/atoms";
import { useCallback } from "react";
import { useSelector } from "react-redux";
import { getUser } from "../../../redux/slices/userSlice";

const Submit = () => {
  const user = useSelector(getUser).user;

  const [src, setSrc] = useState("");
  const [output, setOutput] = useState("");

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
    const isBlank = validateRequiredInput(src, output);

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
          "src: \n" +
          src +
          "\n" +
          "output: " +
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
            label={"src(必須)"}
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
            label={"output(必須)"}
            multiline={false}
            rows={1}
            value={output}
            type={"description"}
            required={true}
            onChange={inputOutput}
          />
        </div>
        <div className="mt-8 text-center">
          <PrimaryButton
            label={"送信する"}
            onClick={submitForm}
            color="primary"
          />
        </div>
      </div>
    </div>
  );
};
export default Submit;
