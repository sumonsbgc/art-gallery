import * as Yup from 'yup';

const phoneRegExp = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

export const signUpSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .max(25, 'First Name must be at most 25 characters')
    .required('Please enter your first name'),
  lastName: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(25, 'Last Name must be at most 25 characters')
    .required('Please enter your last name'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm password is required')
});

export const signInSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required')
});

export const forgotSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required')
});

export const resetSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  pin: Yup.string().required('Verification code is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm password is required')
});

export const changeProfileSchemaNew = Yup.object().shape({
  first_name: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .max(25, 'First Name must be at most 25 characters')
    .required('Please enter your first name'),
  last_name: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(25, 'Last Name must be at most 25 characters')
    .required('Please enter your last name'),
  mobile: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
  country: Yup.string().required('Please enter your country'),
  city: Yup.string().required('Please enter your city'),
  zip_code: Yup.string().required('Please enter your postal code'),
  address: Yup.string().required('Please enter your address')
});

export const aboutProfileSchemaNew = Yup.object().shape({
  about: Yup.string().required('Please enter your about'),
  facebook_url: Yup.string().url('Please enter a valid url'),
  twitter_url: Yup.string().url('Please enter a valid url'),
  instagram_url: Yup.string().url('Please enter a valid url'),
  gplus_url: Yup.string().url('Please enter a valid url'),
  pinterest_url: Yup.string().url('Please enter a valid url')
});
