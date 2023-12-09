import * as Yup from 'yup';
export const signUpSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .matches(/^[a-zA-Z_ ]*$/, 'No speical characters allowed')
    .min(2, 'Name must be between 2 and 16 characters')
    .max(16, 'Name must be between 2 and 16 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  status: Yup.string().max(64, 'Status must be less than 64 characters'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be between 6 and 20 characters')
    .max(20, 'Password must be between 6 and 20 characters'),
});

export const signInSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(6, 'Password must be between 6 and 20 characters')
    .max(20, 'Password must be between 6 and 20 characters'),
});
