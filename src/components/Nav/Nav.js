import React from "react";
import PropTypes from 'prop-types';
import { ReactReduxContext } from 'react-redux'
import { connect } from 'react-redux';

//Connect redux state to props
export default connect( (state) => {
  return {
    view: state.view
   }
})(class Nav extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){

    return(
      <ReactReduxContext.Consumer>
        {({ store }) =>
          <nav className="row">
            <button
              className="o-button col-4"
              onClick={()=>{store.dispatch({
                type: 'CHANGE_VIEW',
                view: 'JokeViewer' })}}>
                Jokes
            </button>
            <button
              className="o-button col-4"
              onClick={()=>{store.dispatch({
                type: 'CHANGE_VIEW',
                view: 'Editor' })}}>
                Editor
            </button>
            <button
              className="o-button col-4"
              onClick={()=>{store.dispatch({
                type: 'CHANGE_VIEW',
                view: 'Generate' })}}>
                Generate
            </button>
          </nav>
        }
      </ReactReduxContext.Consumer>
    )
  }
});
