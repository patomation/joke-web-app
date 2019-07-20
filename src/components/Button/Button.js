import React from "react";

export default class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: false
    }
  }

  _toggleDisabled(){
    this.setState({
      disabled: this.state.disabled ? false : true
    });
  }

  render(){

    return(
      <button
        disabled={this.state.disabled}
        className={`${this.props.className} ${this.state.disabled ? 'o-disabled' : ''}`}
        onClick={ () => {
          this.props.onClick().then(() => {
            this._toggleDisabled();
          });
          this._toggleDisabled();
        }}>

        {this.props.children}

      </button>
    )
  }
}
