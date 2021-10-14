import Head from "next/head";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../redux/slices/userSlice";
import styles from "../../styles/Home.module.css";
import { PlayButton } from "../components/atoms";
import ITyped from "../firebase/ityped";
import Router from "next/router";

type HOME = {
  title: string;
};

export default function Home({ title }: HOME) {
  const user = useSelector(getUser).user;

  return (
    <div className={styles.container}>
      <Head>
        <title>{title}</title>
        <meta name="description" content="TyPro" />
        <link rel="typro" href="/favicon.ico" />
      </Head>
      <div className="w-screen h-screen background-image">
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
