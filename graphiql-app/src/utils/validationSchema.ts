import * as yup from 'yup';

const schemaSignIn = yup.object({
  email: yup.string().required('Please Enter your email'),
  password: yup.string().required('Please Enter your password'),
});

const schemaSignUp = schemaSignIn.shape({
  name: yup.string().required('Please Enter your name'),
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

const schemaRestFull = yup.object({
  method: yup.string().required('Please Enter Method'),
  url: yup.string().required('Please Enter Endpoint URL'),
  body: yup.string(),
});

export { schemaSignIn, schemaSignUp, schemaRestFull };
