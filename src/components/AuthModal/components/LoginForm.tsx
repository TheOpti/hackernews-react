import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useMutation } from '@apollo/client';

import { useAuth } from '../../../context/AuthContext';

import { LOGIN_MUTATION } from './../AuthModal.graphql';

import { loginSchema } from './LoginForm.utils';

interface Props {
  openForgotPasswordForm: () => void;
  handleClose: () => void;
}

export const LoginForm = (props: Props) => {
  const { openForgotPasswordForm, handleClose } = props;
  const [login, { loading }] = useMutation(LOGIN_MUTATION);
  const { setToken } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    validationSchema: loginSchema,
    onSubmit: async ({ email, password }, formikHelpers) => {
      login({
        variables: {
          email,
          password
        },
        onCompleted: (data) => {
          const {
            token,
            user: { name }
          } = data.login;

          setToken(token, name);
          handleClose();
        },
        onError: (error) => {
          formikHelpers.setErrors({
            email: error.message
          });
        }
      });
    }
  });

  const loadingInProgress = loading || formik.isSubmitting;

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="text"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          isInvalid={formik.touched.email && !!formik.errors.email}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.email}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
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

      <div className="d-grid gap-2 mt-4">
        <Button variant="primary" type="submit" disabled={loadingInProgress}>
          {loadingInProgress ? 'Logging in...' : 'Login'}
        </Button>
        <Button variant="link" disabled={loadingInProgress} onClick={openForgotPasswordForm}>
          Forgot your password?
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
