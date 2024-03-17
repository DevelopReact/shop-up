//lib
import * as yup from 'yup';
//lib
import {
  emailValidationSchema,
  messageSchema,
  nameValidationSchema,
  phoneSchema
} from '@/shared/validationSchemas';

export const contactValidationSchema = yup.object().shape({
  name: nameValidationSchema.fields.name,
  email: emailValidationSchema.fields.email,
  phone: phoneSchema.fields.phone,
  message: messageSchema.fields.message
});
