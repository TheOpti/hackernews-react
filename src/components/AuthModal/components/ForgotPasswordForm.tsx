import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import classes from './ForgotPasswordForm.module.css';

interface Props {
  openRegisterForm: () => void;
}

const ForgotPasswordForm = (props: Props) => {
  const { openRegisterForm } = props;

  const [email, setEmail] = useState('');

  const errors = { emailError: '' };
  const loading = false;
  const sendResetEmail = () => {};

  return (
    <>
      <p className="mb-4">
        Enter your email address and we'll send you a link to reset your password.
      </p>
      <Form className="mb-5">
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isInvalid={Boolean(errors.emailError)}
              disabled={loading}
            />
            <Form.Control.Feedback type="invalid">{errors.emailError}</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Form>
      <div className="d-grid gap-2">
        <Button variant="primary" onClick={sendResetEmail}>
          Reset password
        </Button>
        <Button variant="link" disabled={loading} onClick={openRegisterForm}>
          Don't have an account? Sign up
        </Button>
      </div>
    </>
  );
};

export default ForgotPasswordForm;
