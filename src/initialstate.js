const initialstate = {
  view: 'Loader', //Login, Register, Editor, JokeViewer, Generator

  error: '',
  authkey: '',

  jokes: [],
  firstName: 'Chuck',
  lastName: 'Norris',
  results: 10,
  content: '',
  editId: null
}
export default initialstate;
