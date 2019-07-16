import React from "react";

import jokeApi from './modules/jokeApi.js';

export default class App extends React.Component {
  constructor() {
    super();
    //Todo get local store, for fun....
    this.state = {
      firstName: 'Chuck',
      lastName: 'Norris',
      results: 10,
      random: true,
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
  _renderList(){
    let listItems = [];
    for (var i = 0; i < this.state.jokes.length; i++) {
      listItems.push(
        <li className="o-list-item" key={`joke-${i}`}>
          {this.state.jokes[i].joke}
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
      <div className="c-app">
          <header className="c-header">
            <input className="o-input" onChange={(e)=>{this.setState({firstName:e.target.value})}} value={this.state.firstName || ''}></input>
            <input className="o-input" onChange={(e)=>{this.setState({lastName:e.target.value})}} value={this.state.lastName || ''}></input>
            <input className="o-input" onChange={(e)=>{this.setState({results:e.target.value})}} value={this.state.results || 0} type='number'></input>
            <button className="o-button" onClick={this._getJokes.bind(this)}>Get Jokes</button>
          </header>
          <main>
            { this._renderList() }
          </main>
      </div>
    )
  }
}
