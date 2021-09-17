import React from "react";
import Image from "next/image";

type Gif = {
  gifSorce: StaticImageData;
};
const Gif = (props: Gif) => {
  return (
    <div>
      <Image src={props.gifSorce} alt="stamp-gif" width={60} height={60} />
    </div>
  );
};

export default Gif;
