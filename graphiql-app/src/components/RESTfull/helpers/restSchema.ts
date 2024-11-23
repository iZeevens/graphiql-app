import * as yup from 'yup';

const schemaRestFull = yup.object({
  method: yup.string().required('Please Enter Method'),
  url: yup.string().required('Please Enter Endpoint URL'),
  headers: yup.array().max(5, 'Maximum headers can be 5'),
});

export { schemaRestFull };
