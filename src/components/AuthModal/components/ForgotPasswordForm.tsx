import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { forgotPasswordSchema } from './ForgotPasswordForm.utils';

interface Props {
  openRegisterForm: () => void;
}

const ForgotPasswordForm = (props: Props) => {
  const { openRegisterForm } = props;

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values, handlers) => {
      console.log('onSubmit, values ', values);
      console.log('onSubmit, handlers ', handlers);
    }
  });

  return (
    <Form>
      <p className="mb-4">
        Enter your email address and we'll send you a link to reset your password.
      </p>
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
      <div className="d-grid gap-2">
        <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
          Reset password
        </Button>
        <Button variant="link" disabled={formik.isSubmitting} onClick={openRegisterForm}>
          Don't have an account? Sign up
        </Button>
      </div>
    </Form>
  );
};

export default ForgotPasswordForm;
