import React from "react";
import PropTypes from 'prop-types';
import { ReactReduxContext } from 'react-redux'
import { connect } from 'react-redux';

//Connect redux state to props
export default connect( (state) => {
  return {
    view: state.view
   }
})(class View extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){

    return(
      <ReactReduxContext.Consumer>
        {({ store }) =>
          this.props[this.props.view]
        }
      </ReactReduxContext.Consumer>
    )
  }
});
