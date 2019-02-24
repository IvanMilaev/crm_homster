import React from "react";
import { render } from "react-dom";
import * as serviceWorker from "./serviceWorker";
//import "assets/css/material-dashboard-react.css?v=1.4.1";

import "assets/scss/material-dashboard-pro-react.scss?v=1.5.0";
// entry point
import Main from "containers/main";

import { store, history } from "_config";

import jwt_decode from "jwt-decode";
import setAuthToken from "utils/setAuthToken";
import { setCurrentUser, logoutUser } from "modules/auth";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

const target = document.querySelector("#root");

render(<Main store={store} history={history} />, target);

serviceWorker.unregister();
