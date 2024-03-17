import * as yup from 'yup';

export const phoneSchema = yup.object().shape({
  phone: yup
    .string()
    .required('*')
    .matches(/^\d{10}$/, 'the number must contain 10 characters')
});
