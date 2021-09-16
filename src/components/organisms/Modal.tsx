import React from "react";

interface PROPS {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  //   query: {
  //     language: string;
  //     level: string;
  //     count: number;
  //   };
  onClick: (selectedLevel: string) => void;
}

const Modal: React.FC<PROPS> = ({ show, setShow, onClick }) => {
  if (show) {
    return (
      <div
        id="overlay"
        onClick={() => setShow(false)}
        className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center"
      >
        <div
          id="content"
          onClick={(e) => e.stopPropagation()}
          className="z-10 w-3/4 p-4 bg-white"
        >
          <p>スペースを押してゲーム開始</p>
          <p>{onClick}</p>
          <p>{}</p>
          {console.log("test", onClick)}
          <button onClick={() => setShow(false)}>close</button>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Modal;
