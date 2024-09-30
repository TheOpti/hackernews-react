import * as Yup from 'yup';

export const passwordSchema = Yup.object().shape({
  currentPassword: Yup.string().required('Password is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
      'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
    )
    .required('Password is required'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
    .required('Repeat password is required')
});

export const passwordInitialValues = {
  currentPassword: '',
  password: '',
  repeatPassword: ''
};
