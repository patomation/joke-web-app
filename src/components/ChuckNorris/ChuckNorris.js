import React from "react";
import jokeApi from './jokeApi.js';
import {ReactReduxContext, connect } from 'react-redux'

export default class ChuckNorris extends React.Component {
  constructor() {
    super();

    this.state = {
      firstName: 'Chuck',
      lastName: 'Norris',
      results: 10,
      random: true,
      selected: null,
      jokes: [],
    };
  }

  componentDidMount(){}

  _getJokes(){
    jokeApi.get({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      exclude: '[explicit]',
      results: this.state.results
    },(jokes) => {

      this.setState({
        jokes: jokes
      });

    });
  }

  _selected(id){
    this.setState({selected :id});
    this.props.selected(id, this.state.jokes[id]);
  }

  _renderList(){
    let listItems = [];
    for (var i = 0; i < this.state.jokes.length; i++) {
      //Change ui to make item selected
      let selected = this.state.selected === i ? 'o-selected' : '';

      listItems.push(
        <li className={`o-list-item row ${selected}`} key={`joke-${i}`}>
          <div className="col-10">
            {this.state.jokes[i].joke}
          </div>
          <div className="col-2">
            <button className="o-button" onClick={this._selected.bind(this,i)}>Use This Joke</button>
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
        {({ store }) =>
        <section className="c-app container">
            <header className="c-header  row">
              <h1 className="o-h1"> {this.state.firstName} {this.state.lastName} Joke Generator</h1>

              <input className="o-input col-5" onChange={(e)=>{this.setState({firstName:e.target.value})}} value={this.state.firstName || ''}></input>
              <input className="o-input col-5" onChange={(e)=>{this.setState({lastName:e.target.value})}} value={this.state.lastName || ''}></input>
              <input className="o-input col-2" onChange={(e)=>{this.setState({results:e.target.value})}} value={this.state.results || 0} type='number'></input>
              <button className="o-button col-12" onClick={this._getJokes.bind(this)}>Get Jokes</button>
            </header>
            <main className="o-main">
              { this._renderList() }
            </main>
        </section>
      }
      </ReactReduxContext.Consumer>
    )
  }
}
