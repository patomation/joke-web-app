import React from "react";
import { render } from "react-dom";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware  } from 'redux';
import { createLogger } from 'redux-logger';

import thunkMiddleware from 'redux-thunk';
const loggerMiddleware = createLogger();

import App from "./App.js";

import style from "./sass/main.scss";

import rootReducer from './reducers';

let store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware, // Enables dispatch() functions
    // loggerMiddleware // logs actions
  )
);

import {
  authkeyLogin
} from './actions/';

//Auto login
let authkey = localStorage.getItem('authkey');
if(authkey !== null){
  store.dispatch(authkeyLogin(authkey))
} else {
  store.dispatch({type: 'CHANGE_VIEW', view: 'Register'})
}

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
