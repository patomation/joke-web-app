import React from "react";
import { ReactReduxContext } from 'react-redux';

import Nav from './components/Nav/Nav.js';
import View from './components/View/View.js';
import Hide from './components/Hide/Hide.js';
import ChuckNorris from './components/ChuckNorris/ChuckNorris.js';
import Editor from './components/Editor/Editor.js';
import JokeViewer from './components/JokeViewer/JokeViewer.js';
import Login from './components/Login/Login.js';
import Register from './components/Register/Register.js';
import Loader from './components/Loader/Loader.js';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render(){

    return(
      <div className="c-app container">
          <Hide whenViewIs={['Loader', 'Login', 'Register']}>
            <Nav />
          </Hide>

          <View
            Loader={<Loader />}
            Login={<Login />}
            Register={<Register />}
            Generator={<ChuckNorris />}
            Editor={<Editor />}
            JokeViewer={<JokeViewer />} />

      </div>
    )
  }
}
