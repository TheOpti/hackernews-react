import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

const RegisterForm = () => {
  const [login, setLogin] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const errors = { loginError: '', emailError: '', passwordError: '', repeatPasswordError: '' };
  const loading = false;
  const register = () => {};

  return (
    <>
      <Form className="mb-5">
        <Form.Group className="mb-3" controlId="formBasicLogin">
          <Form.Label>Login</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              placeholder="Password"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              isInvalid={Boolean(errors.loginError)}
              disabled={loading}
            />
            <Form.Control.Feedback type="invalid">{errors.loginError}</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
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
        <Form.Group className="mb-3" controlId="formBasicRepeatedPassword">
          <Form.Label>Repeat passowrd</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="password"
              placeholder="Repeat password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              isInvalid={Boolean(errors.repeatPasswordError)}
              disabled={loading}
            />
            <Form.Control.Feedback type="invalid">
              {errors.repeatPasswordError}
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Form>
      <div className="d-grid gap-2">
        <Button variant="primary" onClick={register}>
          Register
        </Button>
      </div>
    </>
  );
};

export default RegisterForm;
