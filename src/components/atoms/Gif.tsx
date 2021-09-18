import React from "react";
import Image from "next/image";

type Gif = {
  gifSorce: StaticImageData;
};
const Gif = (props: Gif) => {
  return (
    <div>
      <Image src={props.gifSorce} alt="stamp-gif" width={100} height={100} />
    </div>
  );
};

export default Gif;
