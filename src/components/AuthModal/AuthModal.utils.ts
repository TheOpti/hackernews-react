export enum FORM_TYPE {
  LOGIN = 'LOGIN',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
  REGISTER = 'REGISTER'
}

export const HEADER_LABELS = {
  [FORM_TYPE.LOGIN]: 'Already a user? Sign in!',
  [FORM_TYPE.FORGOT_PASSWORD]: 'Reset your password',
  [FORM_TYPE.REGISTER]: 'Create new account'
};
