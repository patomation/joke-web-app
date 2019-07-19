import React from "react";
import { ReactReduxContext } from 'react-redux'
import { connect } from 'react-redux';
import {
  getJokes,
  deleteJoke,
  likeJoke,
  dislikeJoke,
  editJoke
} from '../../actions/';


export default connect( (state) => {
  return {
    jokes: state.jokes
   }
})(class JokeViewer extends React.Component {
  constructor() {
    super();
    this.dispatch = null;
  }

  componentDidMount(){
    this.dispatch(getJokes(10));
  }
  _getListItems(){
    let listItems = [];
    for (var i = this.props.jokes.length-1; i > 0; i--) {

      listItems.push(
        <li className="o-list-item row" key={this.props.jokes[i].id}>

          <div className="col-12 col-sm-10 d-block d-sm-none d-md-none d-lg-none d-xl-none">
            <div className="row">
              <div className="col-1 c-likes-plus-dislikes" >
                <i className="o-material-icon">favorite</i>{this.props.jokes[i].likes - this.props.jokes[i].dislikes}
              </div>
              <div className="col-11">
                <p>
                  {this.props.jokes[i].content}
                </p>
              </div>
            </div>
          </div>

          <div className="col-6 col-sm-1">
            <div className=" o-vertical-align">
              <button
                className="o-button col-6 col-sm-12"
                onClick={((id)=>{
                  this.dispatch(likeJoke(id))
                }).bind(this, this.props.jokes[i].id)}>
                  <i className="o-material-icon">thumb_up</i>
              </button>
              <button
                className="o-button col-6 col-sm-12"
                onClick={((id)=>{
                  this.dispatch(dislikeJoke(id))
                }).bind(this, this.props.jokes[i].id)}>
                  <i className="o-material-icon">thumb_down</i>
              </button>
            </div>
          </div>

          <div className="col-12 col-sm-10 d-none d-sm-block d-md-block d-lg-block d-kl-block">
            <div className="o-content">
              <div className="col-12 c-likes-plus-dislikes" >
                <i className="o-material-icon">favorite</i>
                {this.props.jokes[i].likes - this.props.jokes[i].dislikes}
              </div>
              <div className="col-12">
                <p>
                  {this.props.jokes[i].content}
                </p>
              </div>
            </div>
          </div>

          <div className="col-6 col-sm-1">
            <div className=" o-vertical-align">
              <button
                className="o-button col-6 col-sm-12"
                onClick={((id)=>{
                  this.dispatch(deleteJoke(id))
                }).bind(this, this.props.jokes[i].id)}>
                  <i className="o-material-icon">delete</i>
              </button>
              <button
                className="o-button col-6 col-sm-12"
                onClick={((id, content)=>{
                  this.dispatch(editJoke(id, content))
                }).bind(this,
                  this.props.jokes[i].id,
                  this.props.jokes[i].content )}>
                    <i className="o-material-icon">edit</i>
              </button>
            </div>
          </div>
        </li>
      );
    }

    return listItems;
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
                <h1 className="o-h1 col-12">Joke Viewer</h1>
              </header>
              <ul className="o-list">
                {this._getListItems()}
              </ul>
            </section>
        )}}
      </ReactReduxContext.Consumer>
    )
  }
});
