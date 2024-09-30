import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useNotification } from '../../../context/NotificationsProvider';

import { emailInitialValues, emailSchema } from './EmailChangeForm.utils';

interface Props {
  type: 'email' | 'password';
  handleClose: () => void;
}

export const EmailChangeForm = (props: Props) => {
  const { showNotification } = useNotification();

  const formik = useFormik({
    initialValues: emailInitialValues,
    validationSchema: emailSchema,
    onSubmit: async (values, formikHelpers) => {
      showNotification({ message: 'You successfully changed email/password' });
    }
  });

  const loadingInProgress = formik.isSubmitting; // || loading from mutation;

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>New email address</Form.Label>
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
          {loadingInProgress ? 'Logging in...' : 'Update'}
        </Button>
      </div>
    </Form>
  );
};

export default EmailChangeForm;
