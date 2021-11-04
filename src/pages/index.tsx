import Head from "next/head";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/slices/userSlice";
import { PlayButton } from "../components/atoms";
import ITyped from "../firebase/ityped";
import Router from "next/router";
import Image from "next/image";
import BackgroundImage from "../../public/images/background-image.png";

type HOME = {
  title: string;
};

export default function Home({ title }: HOME) {
  const user = useSelector(getUser).user;

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta name="description" content="TyPro" />
        <link rel="typro" href="/favicon.ico" />
      </Head>
      <div className="w-screen h-screen relative">
        <div className="bg-blend-lighten opacity-5">
          <Image
            src={BackgroundImage}
            alt="typro"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />
        </div>
        <div className="h-1/6 text-center text-5xl pt-48">
          <ITyped strings={["Welcome to TyPro.", "Yeah!"]} />
        </div>

        <div className="pt-32">
          {user.isSignedIn ? (
            <div className="w-full flex pt-24">
              <div className="w-1/2 text-center">
                <PlayButton
                  label={"プレイ"}
                  onClick={() => Router.push("/users/selectlanguage")}
                  person={true}
                  isSignedIn={true}
                />
              </div>
              <div className="w-1/2 text-center">
                <PlayButton
                  label={"協力プレイ"}
                  onClick={() => Router.push("/users/selectroom")}
                  isSignedIn={true}
                />
              </div>
            </div>
          ) : (
            <div className="w-full flex pt-24">
              <div className="w-1/2 text-center">
                <PlayButton
                  label={"今すぐプレイ"}
                  onClick={() => Router.push("/guests/countdown")}
                  isSignedIn={false}
                />
              </div>
              <div className="w-1/2 text-center">
                <PlayButton
                  label={"ログインしてプレイ"}
                  onClick={() => Router.push("/signin")}
                  isSignedIn={false}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
