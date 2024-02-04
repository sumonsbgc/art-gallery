import * as Yup from 'yup';

const phoneRegExp = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

export const UpgradeCustomerSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .max(25, 'First Name must be at most 25 characters')
    .required('Please enter your first name'),
  last_name: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(25, 'Last Name must be at most 25 characters')
    .required('Please enter your last name'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  experience: Yup.string().required('Experience is required'),
  designation: Yup.string().required('Designation is required'),
  organisation: Yup.string().required('Organization is required'),
  mobile: Yup.string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone is required'),
  country: Yup.string().required('Please enter your country'),
  city: Yup.string().required('City is required'),
  zip_code: Yup.string().required('Please enter your postal code'),
  address: Yup.string().required('Please enter your address'),
  user_photo: Yup.string().required('Please upload your profile picture'),
  about: Yup.string().required('Please enter about yourself')
});
