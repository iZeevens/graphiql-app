import * as yup from 'yup';

const schemaSignIn = yup.object({
  email: yup.string().required('Please Enter your email'),
  password: yup.string().required('Please Enter your password'),
});

export { schemaSignIn };
