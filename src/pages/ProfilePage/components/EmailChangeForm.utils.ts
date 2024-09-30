import * as Yup from 'yup';

export const emailSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required')
});

export const emailInitialValues = {
  email: '',
  password: ''
};
