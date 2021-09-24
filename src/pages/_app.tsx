import type { AppProps } from "next/app";
import "../../styles/globals.css";
import { Provider } from "react-redux";
import { store, persistor } from "../../redux/store";
import Header from "../components/organisms/Header";
import Auth from "../firebase/Auth";
import { PersistGate } from "redux-persist/lib/integration/react";

// export const store = createStore();

function MyApp({ Component, pageProps }: AppProps) {
  process.on("unhandledRejection", (reason, promise) => {
    console.error(reason);
    process.exit(1);
  });

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Auth>
          <Header />
          <Component {...pageProps} />
        </Auth>
      </PersistGate>
    </Provider>
  );
}
export default MyApp;
