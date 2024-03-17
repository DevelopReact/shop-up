//lib
import * as yup from 'yup';
//lib
import {
  emailValidationSchema,
  nameValidationSchema,
  passwordValidationSchema
} from '@/shared/validationSchemas';

export const profileValidationSchema = yup.object().shape({
  name: nameValidationSchema.fields.name,
  lastName: nameValidationSchema.fields.name,
  email: emailValidationSchema.fields.email,
  address: yup.string().required('*'),
  password: passwordValidationSchema.fields.password,
  newPassword: passwordValidationSchema.fields.password,
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'passwords must match')
    .required('*')
});
