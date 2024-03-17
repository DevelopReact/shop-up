//Core
import * as yup from 'yup';

export const securityCodeSchema = yup.object().shape({
  securityCode: yup
    .string()
    .matches(/^\d{3}$/, `count is not correct`)
    .required('*')
});
