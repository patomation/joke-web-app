import React from "react";
import jokeApi from './jokeApi.js';
import {ReactReduxContext, connect } from 'react-redux'

export default connect( (state) => {
  return {
    firstName: state.firstName,
    lastName: state.lastName,
    results: state.results
   }
})(class ChuckNorris extends React.Component {
  constructor() {
    super();

    this.state = {
      selected: null,
      jokes: [],
    };
    this.dispatch = null;
  }

  componentDidMount(){}

  _getJokes(){
    jokeApi.get({
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      exclude: '[explicit]',
      results: this.props.results
    },(jokes) => {

      this.setState({
        jokes: jokes
      });

    });
  }

  _selected(id){
    //local UI show selected
    this.setState({selected :id});

  }

  _renderList(){
    let listItems = [];
    for (var i = 0; i < this.state.jokes.length; i++) {
      //Change ui to make item selected
      let selected = this.state.selected === i ? 'o-selected' : '';

      listItems.push(
        <li className={`o-list-item row ${selected}`} key={`joke-${i}`}>
          <div className="col-11">
            <p>
              {this.state.jokes[i].joke}
            </p>
          </div>
          <div className="col-1">
            <button
              className="o-button o-vertical-align"
              onClick={((id,joke) => {
                this._selected(id)
                //Add this joke to editor
                this.dispatch({
                  type:"CONTENT_CHANGE",
                  content: joke });
                //Chnage to editor view
                this.dispatch({
                  type:"CHANGE_VIEW",
                  view:"Editor"});

              }).bind(this, i, this.state.jokes[i].joke)}>
                <i className="o-material-icon">edit</i>
              </button>
          </div>
        </li>
      );
    }
    return (
      <ul className="o-list">
        {listItems}
      </ul>
    )
  }

  render(){

    return(
      <ReactReduxContext.Consumer>
        {({ store }) => {
        //Pass dispatch into this object
        this.dispatch = store.dispatch;

        return (
          <section className="c-chuck-norris container">
              <header className="c-header  row">
                <h1 className=""> {this.props.firstName} {this.props.lastName} Joke Generator</h1>

                <div className="col-5">
                <input
                  className="o-input"
                  onChange={(e)=>{
                    store.dispatch({
                      type: 'FIRST_NAME_CHANGE',
                      content: e.target.value })
                  }}
                  value={this.props.firstName || ''}></input>
                </div>

                <div className="col-5">
                <input
                  className="o-input"
                  onChange={(e)=>{
                    store.dispatch({
                      type: 'LAST_NAME_CHANGE',
                      content: e.target.value })
                  }}
                  value={this.props.lastName || ''}></input>
                </div>

                <div className="col-2">
                <input
                  className="o-input"
                  onChange={(e)=>{
                    store.dispatch({
                      type: 'RESULTS_CHANGE',
                      results: e.target.value })
                  }}
                  value={this.props.results || 0}
                  type='number'></input>
                </div>

                <div className="col-12">
                  <button className="o-button col-6" onClick={this._getJokes.bind(this)}>Get Jokes</button>
                </div>
              </header>
              <main className="o-main">
                { this._renderList() }
              </main>
          </section>
        );
      }}
      </ReactReduxContext.Consumer>
    )
  }
});
