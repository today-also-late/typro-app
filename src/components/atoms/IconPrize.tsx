import First from "../../../public/images/1.png";
import Second from "../../../public/images/2.png";
import Third from "../../../public/images/3.png";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";

const IconPrize = (props: any) => {
  const [prize, setPrize] = useState<StaticImageData>(First);

  const changePrize = (index: number) => {
    if (index === 1) {
      setPrize(First);
    }
    if (index === 2) {
      setPrize(Second);
    }
    if (index === 3) {
      setPrize(Third);
    }
  };

  useEffect(() => {
    changePrize(props.index + 1);
  }, [props.index]);

  return (
    <>
      {props.index + 1 <= 3 ? (
        <div>
          <div className="relative">
            <Image
              className="rounded-full"
              src={props.image.path}
              alt="userProfileImage"
              width={36}
              height={36}
            />
            <div className="absolute inset-0 top-1 -right-1">
              <Image
                className="rounded-full"
                src={prize}
                alt="userProfileImage"
                width={44}
                height={44}
              />
            </div>
          </div>
        </div>
      ) : (
        <Image
          className="rounded-full"
          src={props.image.path}
          alt="userProfileImage"
          width={36}
          height={36}
        />
      )}
    </>
  );
};
export default IconPrize;
