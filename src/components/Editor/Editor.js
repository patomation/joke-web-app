import React from "react";
import { ReactReduxContext } from 'react-redux'
import { connect } from 'react-redux';
import {
  postJoke,
  updateJoke
} from '../../actions/';

export default connect( (state) => {
  return {
    content: state.content
   }
})(class Editor extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
        <ReactReduxContext.Consumer>
          {({ store }) =>
            <section className="c-joke-editor container">
              <header className="c-header row">
              <h1 className="o-h1 col-12">Joke Editor</h1>
              </header>
              <textarea
                value={this.props.content}
                onChange={(e)=>{
                  store.dispatch({ type: 'CONTENT_CHANGE', content: e.target.value })
                }}
                rows="4"
                className="o-textarea col-12"></textarea>
              <button
                className="o-button col-12"
                onClick={()=>{
                  //Update Joke
                  if( store.getState().editId !== null){
                    store.dispatch( updateJoke( store.getState().editId, store.getState().content ) );
                  //Create new Joke
                  } else {
                    store.dispatch(postJoke( store.getState().content ));
                  }
                  store.dispatch({type:'CHANGE_VIEW',view:'JokeViewer'})
                }}>
                  <i className="o-material-icon">cloud_upload</i>
                </button>
            </section>
          }
        </ReactReduxContext.Consumer>

    )
  }
});
