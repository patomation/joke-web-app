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
      jokes: [{joke: 'Human cloning is outlawed because of Chuck Norris, because then it would be possible for a Chuck Norris roundhouse kick to meet another Chuck Norris roundhouse kick. Physicists theorize that this contact would end the universe.'}],
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
        <li className="o-list-item row" key={`joke-${i}`}>
          <div className="col-11">
            {this.state.jokes[i].joke}
          </div>
          <div className="col-1">
            <button className="o-button">like</button>
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
      <div className="c-app container">
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
      </div>
    )
  }
}
