import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useMutation } from '@apollo/client';

import { useAuth } from '../../context/AuthContext';

import { LOGIN_MUTATION } from './AuthModal.graphql';
import { EMAIL_REGEX } from './AuthModal.utils';

import classes from './AuthModal.module.css';

interface Props {
  open: boolean;
  handleClose: () => void;
}

export const AuthModal = (props: Props) => {
  const { open, handleClose } = props;

  const { setToken } = useAuth();

  useEffect(() => {
    // Avoid blinking inside inputs because of Boostrap animation
    setTimeout(() => {
      setEmail('');
      setPassword('');
      setErrors({ emailError: '', passwordError: '' });
    }, 200);
  }, [open]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({ emailError: '', passwordError: '' });

  const [login, { loading }] = useMutation(LOGIN_MUTATION);

  const doLogin = () => {
    const validationErrors = { emailError: '', passwordError: '' };
    if (!email.match(EMAIL_REGEX)) {
      validationErrors.emailError = 'Please provide correct email.';
    }

    if (password === '') {
      validationErrors.passwordError = 'You need to type your password.';
    }

    if (validationErrors.emailError || validationErrors.passwordError) {
      setErrors(validationErrors);
      return;
    }

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
        setErrors({
          emailError: error.message,
          passwordError: ''
        });
      }
    });
  };

  return (
    <Modal show={open} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Already a user? Sign in!</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form className={classes.form}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
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

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isInvalid={Boolean(errors.passwordError)}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">{errors.passwordError}</Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Form>

        <div className="d-grid gap-2">
          <Button variant="primary" onClick={doLogin} disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
          <Button variant="link" disabled={loading}>
            Forgot your password?
          </Button>
        </div>
      </Modal.Body>

      <Modal.Footer className={classes.footer}>
        <div className="d-grid gap-2">
          <Button variant="success" type="submit" disabled={loading}>
            Create new account
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default AuthModal;
