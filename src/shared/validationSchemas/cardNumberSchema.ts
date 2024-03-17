//lib
import * as yup from 'yup';

export const cardNumberSchema = yup.object().shape({
  cardNumber: yup
    .string()
    .matches(/^\d{16}$/, `count is not correct`)
    .required('*')
});
