import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import history from "./history";
import store from "./store";
import App from "./App";

import { initFacebookSdk } from "./init-facebook-sdk";
import { TimeProvider } from "./components/TimeContext";
import CountdownClock from "./components/CountDown";

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,

  document.getElementById("app")
);
