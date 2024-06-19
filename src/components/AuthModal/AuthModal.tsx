import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { HEADER_LABELS, FORM_TYPE } from './AuthModal.utils';

import LoginForm from './components/LoginForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import RegisterForm from './components/RegisterForm';

import classes from './AuthModal.module.css';

interface Props {
  open: boolean;
  handleClose: () => void;
}

export const AuthModal = (props: Props) => {
  const { open, handleClose } = props;

  const [formType, setFormType] = useState(FORM_TYPE.LOGIN);

  return (
    <Modal show={open} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{HEADER_LABELS[formType]}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {formType === FORM_TYPE.LOGIN && (
          <LoginForm openForgotPasswordForm={() => setFormType(FORM_TYPE.FORGOT_PASSWORD)} />
        )}
        {formType === FORM_TYPE.FORGOT_PASSWORD && (
          <ForgotPasswordForm openRegisterForm={() => setFormType(FORM_TYPE.REGISTER)} />
        )}
        {formType === FORM_TYPE.REGISTER && <RegisterForm />}
      </Modal.Body>

      <Modal.Footer className={classes.footer}>
        <div className="d-grid gap-2">
          <Button
            variant="success"
            type="submit"
            onClick={() => {
              if (formType === FORM_TYPE.LOGIN) {
                setFormType(FORM_TYPE.REGISTER);
                return;
              }

              setFormType(FORM_TYPE.LOGIN);
            }}>
            {formType === FORM_TYPE.LOGIN ? 'Create new account' : 'Back to Login'}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default AuthModal;
