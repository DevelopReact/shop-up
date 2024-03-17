//lib
import * as yup from 'yup';
//validation schemas
import {
  emailValidationSchema,
  passwordValidationSchema
} from '@/shared/validationSchemas';

export const logInValidationSchema = yup.object().shape({
  email: emailValidationSchema.fields.email,
  password: passwordValidationSchema.fields.password
});
