//Core
import * as yup from 'yup';

export const dateSchema = yup.object().shape({
  cardDate: yup
    .string()
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry date must be in format MM/YY')
    .required('*')
});
