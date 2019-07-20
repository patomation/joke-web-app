import React from "react";
import PropTypes from 'prop-types';
import { ReactReduxContext } from 'react-redux'
import { connect } from 'react-redux';

//Connect redux state to props
export default connect( (state) => {
  return {}
})(class Loader extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){

    return(
      <ReactReduxContext.Consumer>
        {({ store }) =>
          <i className="c-loader o-material-icon o-spinner o-center-align">autorenew</i>
        }
      </ReactReduxContext.Consumer>
    )
  }
});
