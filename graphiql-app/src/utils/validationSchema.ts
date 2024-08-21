import * as yup from 'yup';

const schema = yup.object({
  email: yup
    .string()
    .required('Please Enter your email')
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Email must be correct',
    ),
  password: yup
    .string()
    .required('Please Enter your password')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/[A-Za-zА-Яа-я]/, 'Password must contain at least one letter')
    .matches(/\d/, 'Password must contain at least one digit')
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      'Password must contain at least one special character',
    ),
});

export default schema;
