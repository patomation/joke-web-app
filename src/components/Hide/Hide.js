import React from "react";
import PropTypes from 'prop-types';
import { ReactReduxContext } from 'react-redux'
import { connect } from 'react-redux';

//Connect redux state to props
export default connect( (state) => {
  return {
    view: state.view
   }
})(class Hide extends React.Component {
  constructor(props) {
    super(props);
  }

  _getChildren(){
    let children = null;
    //Make sure option props are defined and not throwing errors
    if (this.props.whenViewIs !== undefined && Array.isArray(this.props.whenViewIs)) {
      //If view is included in <HIDE> whenViewIs Array then dont show components
      if (this.props.whenViewIs.includes(this.props.view) === false) {
        children = this.props.children;
      }
    }
    return children;
  }

  render(){

    return(
      <ReactReduxContext.Consumer>
        {({ store }) =>
          this._getChildren()
        }
      </ReactReduxContext.Consumer>
    )
  }
});
