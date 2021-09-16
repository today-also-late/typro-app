import NoProfileImage from "../../../public/images/no-profile.png";
import Image from "next/image";

const ImagePreview = (props: any) => {
  return (
    <div className="pt-8">
      {props.image.path ? (
        <div
          className="w-56 h-56 mx-auto"
          key={props.image.id}
          onClick={() => props.delete(props.image.id)}
        >
          <Image
            className="rounded-full"
            src={props.image.path}
            alt="userProfileImage"
            width={220}
            height={215}
          />
        </div>
      ) : (
        <div className="w-56 h-56 mx-auto">
          <label>
            <Image
              className="rounded-full"
              src={NoProfileImage}
              alt="NoProfileImage"
              width={220}
              height={215}
            />
            <input
              className="hidden"
              type="file"
              id="image"
              onChange={(event) => props.upload(event)}
            />
          </label>
        </div>
      )}
    </div>
  );
};
export default ImagePreview;
