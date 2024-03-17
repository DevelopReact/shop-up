//lib
import * as yup from 'yup';

const tooShortMessage = 'min length — ${min} symbol';
const tooLongMessage = 'max length — ${max} symbol';

export const passwordValidationSchema = yup.object().shape({
  password: yup
    .string()
    .min(5, tooShortMessage)
    .max(16, tooLongMessage)
    .required('*')
});
