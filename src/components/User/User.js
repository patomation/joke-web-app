import React from "react";
import PropTypes from 'prop-types';
import { ReactReduxContext } from 'react-redux'
import { connect } from 'react-redux';

import { logOut } from '../../actions/';

//Connect redux state to props
export default connect( (state) => {
  return {
    userName: state.userName
   }
})(class User extends React.Component {
  constructor(props) {
    super(props);
  }


  render(){

    return(
      <ReactReduxContext.Consumer>
        {({ store }) =>
          <div className='c-user'>
            <div className="o-icon-fix">
              <div>
                <i className="o-material-icon">account_circle</i>
              </div>
            </div>
            <span>{this.props.userName}</span>
            <button
              className="o-button"
              onClick={()=>{
                store.dispatch(logOut());
              }}>
                Logout</button>
          </div>
        }
      </ReactReduxContext.Consumer>
    )
  }
});
