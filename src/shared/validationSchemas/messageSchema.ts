//lib
import * as yup from 'yup';

export const messageSchema = yup.object().shape({
  message: yup.string().max(250, 'max length ${max} symbols')
});
