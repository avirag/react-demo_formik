import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center'
}

const App = ({
  values,
  errors,
  touched,
  isSubmitting
}) => (
    <div style={styles}>
      <h1>Formik Demo</h1>
      <Form>
        <div>
          {touched.email && errors.email && <p>{errors.email}</p>}
          <Field type="email" name="email" placeholder="Email" />
        </div>
        <div>
          {touched.password && errors.password && <p>{errors.password}</p>}
          <Field type="password" name="password" placeholder="Password" />
        </div>
        <label>
          <Field type="checkbox" name="newsletter" checked={values.newsletter} />
          Join our newsletter
        </label>
        <Field component="select" name="plane">
          <option value="free">Free</option>
          <option value="premium">Premium</option>
        </Field>
        <button disabled={isSubmitting}>Submit</button>
      </Form>
    </div>
  )

const FormikApp = withFormik({
  mapPropsToValues({ email, password, newsletter, plane }) {
    return {
      email: email || '',
      password: password || '',
      newsletter: newsletter || true,
      plane: plane || 'free'
    }
  },
  validationSchema: Yup.object().shape({
    email: Yup.string().email('Email NOT VALID').required('Email is required'),
    password: Yup.string().min(9, 'Password must be at least 9 character').required()
  }),
  handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
    setTimeout(() => {
      if (values.email === 'hello@hello.hu') {
        setErrors({
          email: 'That email is already taken.'
        });
      } else {
        resetForm();
      }
      setSubmitting(false);
    }, 2000);
    console.log(values);
  }
})(App)

export default FormikApp;