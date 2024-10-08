import React from "react";
import ReactDOM from "react-dom/client";
import "./Layout/styles.css";
import App from "./Layout/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
// import { PersistGate } from "reduxjs-toolkit-persist/es/integration/react";
import { PersistGate } from "redux-persist/integration/react";
import { persister, store } from "./Store/ConfigureStore";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persister}>
          <App />
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
