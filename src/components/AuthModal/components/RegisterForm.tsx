import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { registrationSchema } from './RegisterForm.utils';

const RegisterForm = () => {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      repeatPassword: ''
    },
    validationSchema: registrationSchema,
    onSubmit: async (values, handlers) => {
      console.log('onSubmit, values ', values);
      console.log('onSubmit, handlers ', handlers);
    }
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-4" controlId="formUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          isInvalid={formik.touched.username && !!formik.errors.username}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-4" controlId="formEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          isInvalid={formik.touched.email && !!formik.errors.email}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-4" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          isInvalid={formik.touched.password && !!formik.errors.password}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-4" controlId="formRepeatPassword">
        <Form.Label>Repeat Password</Form.Label>
        <Form.Control
          type="password"
          name="repeatPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.repeatPassword}
          isInvalid={formik.touched.repeatPassword && !!formik.errors.repeatPassword}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.repeatPassword}</Form.Control.Feedback>
      </Form.Group>
      <div className="d-grid gap-2">
        <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
          Register
        </Button>
      </div>
    </Form>
  );
};

export default RegisterForm;
