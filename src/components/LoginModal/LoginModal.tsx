import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useMutation } from '@apollo/client';

import { LOGIN_MUTATION } from './LoginModal.graphql';
import { EMAIL_REGEX } from './LoginModal.utils';

import classes from './LoginModal.module.css';

interface Props {
  open: boolean;
  handleClose: () => void;
}

export const LoginModal = (props: Props) => {
  const { open, handleClose } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const [login, { loading }] = useMutation(LOGIN_MUTATION);

  const doLogin = () => {
    if (password === '') {
      setPasswordError('You need to type your password.');
      return;
    }

    if (!email.match(EMAIL_REGEX)) {
      setEmailError('Please provide correct email.');
      return;
    }

    setPasswordError('');
    setEmailError('');

    login({
      variables: {
        email,
        password
      },
      onCompleted: () => {
        console.log('!!! login - onCompleted');
      },
      onError: (error) => {
        setEmailError(error.message);
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
                isInvalid={Boolean(emailError)}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
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
                isInvalid={Boolean(passwordError)}
                disabled={loading}
              />
              <Form.Control.Feedback type="invalid">{passwordError}</Form.Control.Feedback>
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

export default LoginModal;
