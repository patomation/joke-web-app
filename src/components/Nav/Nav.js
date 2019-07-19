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
          <nav className="c-nav row">
            <button
              className="o-button col-4"
              onClick={()=>{store.dispatch({
                type: 'CHANGE_VIEW',
                view: 'JokeViewer' })}}>
                <div><i className="o-material-icon">visibility</i></div>
                <div>Jokes</div>
            </button>
            <button
              className="o-button col-4"
              onClick={()=>{store.dispatch({
                type: 'CHANGE_VIEW',
                view: 'Editor' })}}>
                <div><i className="o-material-icon">insert_comment</i></div>
                <div>Editor</div>
            </button>
            <button
              className="o-button col-4"
              onClick={()=>{store.dispatch({
                type: 'CHANGE_VIEW',
                view: 'Generator' })}}>
                <div><i className="o-material-icon">loop</i></div>
                <div>Generator</div>
            </button>
          </nav>
        }
      </ReactReduxContext.Consumer>
    )
  }
});
