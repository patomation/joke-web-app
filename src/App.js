import React from "react";
import { ReactReduxContext } from 'react-redux';

import Nav from './components/Nav/Nav.js';
import View from './components/View/View.js';
import ChuckNorris from './components/ChuckNorris/ChuckNorris.js';
import Editor from './components/Editor/Editor.js';
import JokeViewer from './components/JokeViewer/JokeViewer.js';



export default class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render(){

    return(
      <div className="c-app container">
          <Nav/>

          <View
            Generate={
              <ChuckNorris />
            }
            Editor={<Editor />}
            JokeViewer={<JokeViewer />} />

      </div>
    )
  }
}
