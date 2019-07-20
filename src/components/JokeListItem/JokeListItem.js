import React from "react";
import PropTypes from 'prop-types';
import { ReactReduxContext } from 'react-redux'
import { connect } from 'react-redux';
import Button from '../Button/Button.js';

import {
  deleteJoke,
  likeJoke,
  dislikeJoke,
  editJoke
} from '../../actions/';

//Connect redux state to props
export default connect( (state) => {
  return {
    authkey: state.authkey
  }
})(class JokeListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false
    }
  }

  render(){

    return(
      <ReactReduxContext.Consumer>
        {({ store }) =>
        <li
          className={`o-list-item row ${this.state.disabled ? "o-disabled" : ""}`}
          key={this.props.joke.id}>

          <div className="col-12 col-sm-10 d-block d-sm-none d-md-none d-lg-none d-xl-none">
            <div className="row">
              <div className="col-1 c-likes-plus-dislikes" >
                <i className="o-material-icon">favorite</i>{this.props.joke.likes - this.props.joke.dislikes}
              </div>
              <div className="col-11">
                <p>
                  {this.props.joke.content}
                </p>
              </div>
            </div>
          </div>

          <div className="col-6 col-sm-1">
            <div className=" o-vertical-align">
              <Button
                className="o-button col-6 col-sm-12"
                onClick={((id)=>{
                  return store.dispatch(likeJoke(id, this.props.authkey))
                }).bind(this, this.props.joke.id)}>
                  <i className="o-material-icon">thumb_up</i>
              </Button>
              <Button
                className="o-button col-6 col-sm-12"
                onClick={((id)=>{
                  return store.dispatch(dislikeJoke(id, this.props.authkey))
                }).bind(this, this.props.joke.id)}>
                  <i className="o-material-icon">thumb_down</i>
              </Button>
            </div>
          </div>

          <div className="col-12 col-sm-10 d-none d-sm-block d-md-block d-lg-block d-kl-block">
            <div className="o-content">
              <div className="col-12 c-likes-plus-dislikes" >
                <i className="o-material-icon">favorite</i>
                {this.props.joke.likes - this.props.joke.dislikes}
              </div>
              <div className="col-12">
                <p>
                  {this.props.joke.content}
                </p>
              </div>
            </div>
          </div>

          <div className="col-6 col-sm-1">
            <div className=" o-vertical-align">
              <button
                className="o-button col-6 col-sm-12"
                onClick={((id)=>{
                  store.dispatch(deleteJoke(id));
                  this.setState({ disabled: true });
                }).bind(this, this.props.joke.id)}>
                  <i className="o-material-icon">delete</i>
              </button>
              <button
                className="o-button col-6 col-sm-12"
                onClick={((id, content)=>{
                  store.dispatch(editJoke(id, content))
                }).bind(this,
                  this.props.joke.id,
                  this.props.joke.content )}>
                    <i className="o-material-icon">edit</i>
              </button>
            </div>
          </div>
        </li>
        }
      </ReactReduxContext.Consumer>
    )
  }
});
