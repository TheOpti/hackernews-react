import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

import classes from './LoginModal.module.css';

interface Props {
  open: boolean;
  handleClose: () => void;
}

export const LoginModal = (props: Props) => {
  const { open, handleClose } = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Modal show={open} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Already a user? Sign in!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className={classes.form}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
        <div className="d-grid gap-2">
          <Button variant="primary">Login</Button>
          <Button variant="link">Forgot your password?</Button>
        </div>
      </Modal.Body>
      <Modal.Footer className={classes.footer}>
        <div className="d-grid gap-2">
          <Button variant="success" type="submit">
            Create new account
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default LoginModal;
