export function editJoke(id, content){
  return dispatch => {
    dispatch({type:'CHANGE_VIEW', view: 'Editor'})
    dispatch({type:'EDIT_ID_CHANGE', id: id})
    dispatch({type:'CONTENT_CHANGE', content: content})

  }
}
