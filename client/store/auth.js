import axios from "axios";
import history from "../history";
import thunk from "redux-thunk";
import logger from "redux-logger";

const TOKEN = "token";

/**
 * ACTION TYPES
 */
const SET_AUTH = "SET_AUTH";

/**
 * ACTION CREATORS
 */
const setAuth = (auth) => ({ type: SET_AUTH, auth });

/**
 * THUNK CREATORS
 */

export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get("/auth/me", {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticate =
  (username, password, method) => async (dispatch) => {
    try {
      const res = await axios.post(`/auth/${method}`, { username, password });
      window.localStorage.setItem(TOKEN, res.data.token);
      dispatch(me());
    } catch (authError) {
      return dispatch(setAuth({ error: authError }));
    }
  };

export const facebookLogin = () => {
  return async (dispatch) => {
    const { authResponse } = await new Promise(window.FB.login);
    if (!authResponse) return;
    await facebookAuthenticate(authResponse.accessToken);
    history.push("/");
  };
};

export const facebookAuthenticate = async (accessToken) => {
  //will need to write the backend rout
  const { data } = await axios.post("/auth/", { accessToken });
  //remember to log what data object incase "accesstoken" isnt right name
  window.localStorage.setItem(TOKEN, data.accessToken);
  // logic for if a user doesnt exist needs to be implemented
  dispatch(me());
  startAuthenticateTimer();
  return data;
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push("/login");
  return {
    type: SET_AUTH,
    auth: {},
  };
};

function facebookLogout() {
  // revoke app permissions to logout completely because FB.logout() doesn't remove FB cookie
  window.localStorage.removeItem(TOKEN);
  window.FB.api("/me/permissions", "delete", null, () => window.FB.logout());
  stopAuthenticateTimer();
  history.push("/login");
  return {
    type: SET_AUTH,
    auth: {},
  };
}

// helper methods
// this is to help with access code timingout, after a set amount of time,

let authenticateTimeout;

function startAuthenticateTimer() {
  // parse json object from base64 encoded jwt token
  const jwtToken = JSON.parse(atob(accountSubject.value.token.split(".")[1]));

  // set a timeout to re-authenticate with the api one minute before the token expires
  const expires = new Date(jwtToken.exp * 1000);
  const timeout = expires.getTime() - Date.now() - 60 * 1000;
  const { accessToken } = window.FB.getAuthResponse();
  authenticateTimeout = setTimeout(() => apiAuthenticate(accessToken), timeout);
}

function stopAuthenticateTimer() {
  // cancel timer for re-authenticating with the api
  clearTimeout(authenticateTimeout);
}

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
