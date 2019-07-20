import React from "react";
import { Formik } from 'formik';
import { ReactReduxContext } from 'react-redux'
import { connect } from 'react-redux';
import {
  login,
} from '../../actions/';

export default connect( (state) => {
  return {
    error: state.error
  }
})(class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
        <ReactReduxContext.Consumer>
          {({ store }) =>
            <section className="c-login o-vertical-align container">
            <header className="c-header row">
              <h1 className="col-12">Login</h1>
            </header>
            <Formik
                  initialValues={{ email: '', password: '' }}
                  validate={values => {
                    let errors = {};
                    if (!values.email) {
                      errors.email = 'Required';
                    } else if (
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                    ) {
                      errors.email = 'Invalid email address';
                    }
                    if (!values.password) {
                      errors.password = 'Required';
                    }
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    store.dispatch(login(values))
                      .then( result =>{
                        setSubmitting(false);
                      })
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="o-error coll-12">
                        {this.props.error}
                      </div>
                      <input
                        className="o-input col-12"
                        placeholder="Email"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                      />
                      <div className="o-error coll-12">
                        {errors.email && touched.email && errors.email}
                      </div>
                      <input
                        className="o-input col-12"
                        placeholder="Password"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                      />
                      <div className="o-error col-12">
                        {errors.password && touched.password && errors.password}
                      </div>
                      <div className="c-double-button">
                        <button
                          className="o-button col-6"
                          type="submit"
                          disabled={isSubmitting}>
                          Login
                        </button>
                        <button
                          className="o-button-secondary col-6"
                          onClick={(e)=>{
                            e.preventDefault();
                            store.dispatch({type: 'CHANGE_VIEW', view: 'Register'});
                          }}>
                          Sign Up
                        </button>

                      </div>
                    </form>
                  )}
                </Formik>
            </section>
          }
        </ReactReduxContext.Consumer>

    )
  }
});
