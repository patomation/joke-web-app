import React from "react";
import { Formik } from 'formik';
import { ReactReduxContext } from 'react-redux'
import { connect } from 'react-redux';
import {
  register,
} from '../../actions/';

export default connect( (state) => {
  return {
    error: state.error
  }
})(class Register extends React.Component {
  constructor(props) {
    super(props);
  }
  render(){
    return (
        <ReactReduxContext.Consumer>
          {({ store }) =>
            <section className="col-12 col-md-6 c-register o-vertical-align container">
            <header className="c-header row">
              <h1 className="col-12">Register</h1>
            </header>
            <Formik
                  initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
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
                    if (!values.firstName) {
                      errors.firstName = 'Required';
                    }
                    return errors;
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    store.dispatch(register(values))
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
                        placeholder="First Name"
                        name="firstName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.firstName}
                      />
                      <div className="o-error coll-12">
                        {errors.firstName}
                      </div>
                      <input
                        className="o-input col-12"
                        placeholder="Last Name"
                        name="lastName"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.lastName}
                      />
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
                          Register
                        </button>
                        <button
                          className="o-button-secondary col-6"
                          onClick={(e)=>{
                            e.preventDefault();
                            store.dispatch({type: 'CHANGE_VIEW', view: 'Login'});
                            store.dispatch({type: 'ERROR_MESSAGE', message: null});
                          }}>
                          Login
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
