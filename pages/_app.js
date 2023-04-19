import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import "../styles/globals.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/Dashboard.css";
import MainLayout from "../src/components/layout/MainLayout";
import { useEffect } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "../src/redux/store";
import { PersistGate } from "redux-persist/lib/integration/react";
import LoadingScreen from "../src/components/LoadingScreen";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap")
      : null;
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>

        <MainLayout>
          <>
            <LoadingScreen />
            <Component {...pageProps} />{" "}
          </>
        </MainLayout>
      </PersistGate>
    </Provider>
  );
}

export default MyApp;
