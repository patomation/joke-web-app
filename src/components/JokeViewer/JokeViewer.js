import React from "react";
import { ReactReduxContext } from 'react-redux'
import { connect } from 'react-redux';
import JokeListItem from '../JokeListItem/JokeListItem.js';
import Loader from '../Loader/Loader';

import {
  getJokes
} from '../../actions/';

export default connect( (state) => {
  return {
    jokes: state.jokes,
    authkey: state.authkey
   }
})(class JokeViewer extends React.Component {
  constructor() {
    super();
    this.dispatch = null;
  }

  componentDidMount(){
    this.dispatch(getJokes(10));
  }

  _showLoader(){
    if(this.props.jokes.length === 0) {
      return <Loader />
    }
  }

  render(){
    return (
      <ReactReduxContext.Consumer>
        {({ store }) => {
          //Pass dispatch into this object
          this.dispatch = store.dispatch;

          return (
            <section className="c-joke-viewer container">
              <header className="c-header row">
                <h1 className=" col-12">Joke Viewer</h1>
              </header>
              <ul className="o-list">
                {this._showLoader()}
                {this.props.jokes.slice(0).reverse().map( joke => {
                  return (
                    <JokeListItem
                      key={joke.id}
                      joke={joke}
                    />);
                })}
              </ul>
            </section>
        )}}
      </ReactReduxContext.Consumer>
    )
  }
});
