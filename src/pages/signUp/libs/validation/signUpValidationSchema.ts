//lib
import * as yup from 'yup';
// validation schemas
import {
  emailValidationSchema,
  nameValidationSchema,
  passwordValidationSchema
} from '@/shared/validationSchemas';

export const signUpValidationSchema = yup.object().shape({
  name: nameValidationSchema.fields.name,
  email: emailValidationSchema.fields.email,
  password: passwordValidationSchema.fields.password
});
