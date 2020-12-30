import React, { useEffect } from "react";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import configureStore from "./redux/store/configureStore";
import { PersistGate } from "redux-persist/integration/react";

import "react-dates/lib/css/_datepicker.css";
import "react-dates/initialize";

import "./styles/styles.scss";

const { store, persistor } = configureStore();

function App() {
  useEffect(() => {});

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppRouter />
      </PersistGate>
    </Provider>
  );
}

export default App;
