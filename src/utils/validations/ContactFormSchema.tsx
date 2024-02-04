import * as Yup from 'yup';
const phoneRegExp = /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

export const ContactFormSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, 'First name must be at least 2 characters')
    .max(25, 'First Name must be at most 25 characters')
    .required('Please enter your first name'),
  last_name: Yup.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(25, 'Last Name must be at most 25 characters')
    .required('Please enter your last name'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  mobile: Yup.string()
    .required('Phone is required')
    .matches(phoneRegExp, 'Phone number is not valid'),
  message: Yup.string().required('Please enter your message')
});
