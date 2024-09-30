import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useNotification } from '../../../context/NotificationsProvider';

import { passwordInitialValues, passwordSchema } from './PasswordChangeForm.utils';

interface Props {}

export const PasswordChangeForm = (props: Props) => {
  const { showNotification } = useNotification();

  const formik = useFormik({
    initialValues: passwordInitialValues,
    validationSchema: passwordSchema,
    onSubmit: async (values, formikHelpers) => {
      showNotification({ message: 'You successfully changed email/password' });
    }
  });

  const loadingInProgress = formik.isSubmitting; // || loading from mutation;

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-5" controlId="formCurrentPassword">
        <Form.Label>You current pasasword</Form.Label>
        <Form.Control
          type="text"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.currentPassword}
          isInvalid={formik.touched.currentPassword && !!formik.errors.currentPassword}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.currentPassword}
        </Form.Control.Feedback>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>New password</Form.Label>
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
      <Form.Group className="mb-3" controlId="formRepeatPassword">
        <Form.Label>Repeat new password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.repeatPassword}
          isInvalid={formik.touched.repeatPassword && !!formik.errors.repeatPassword}
        />
        <Form.Control.Feedback type="invalid">{formik.errors.repeatPassword}</Form.Control.Feedback>
      </Form.Group>

      <div className="d-grid gap-2 mt-4">
        <Button variant="primary" type="submit" disabled={loadingInProgress}>
          {loadingInProgress ? 'Updating...' : 'Update'}
        </Button>
      </div>
    </Form>
  );
};

export default PasswordChangeForm;
