//lib
import * as yup from 'yup';

const tooShortMessage = 'min length — ${min} symbol';
const tooLongMessage = 'max length — ${max} symbol';

export const postCodeSchema = yup.object().shape({
  postCode: yup
    .string()
    .matches(/^\d+$/, 'The field should have digits only')
    .required('*')
    .min(4, tooShortMessage)
    .max(8, tooLongMessage)
});
