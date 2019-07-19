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
          <div className="col-2">
            <button
              className="o-button"
              onClick={((id)=>{
                this.dispatch(likeJoke(id))
              }).bind(this, this.props.jokes[i].id)}>
                {this.props.jokes[i].likes} likes
            </button>
            <button
              className="o-button"
              onClick={((id)=>{
                this.dispatch(dislikeJoke(id))
              }).bind(this, this.props.jokes[i].id)}>
                {this.props.jokes[i].dislikes} dislikes
            </button>
          </div>

          <p className="col-8">
            {this.props.jokes[i].content}
          </p>

          <div className="col-2">
            <button
              className="o-button"
              onClick={((id)=>{
                this.dispatch(deleteJoke(id))
              }).bind(this, this.props.jokes[i].id)}>
                delete
            </button>
            <button
              className="o-button"
              onClick={((id, content)=>{
                this.dispatch(editJoke(id, content))
              }).bind(this,
                this.props.jokes[i].id,
                this.props.jokes[i].content )}>
                  edit
            </button>
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
