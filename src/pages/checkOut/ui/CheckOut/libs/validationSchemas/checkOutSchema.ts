//lib
import * as yup from 'yup';
//lib
import {
  emailValidationSchema,
  nameValidationSchema,
  phoneSchema
} from '@/shared/validationSchemas';

export const checkOutSchema = yup.object().shape({
  firstName: nameValidationSchema.fields.name,
  companyName: nameValidationSchema.fields.name,
  streetAddress: yup.string().required('*'),
  apartment: yup.string().required('*'),
  town: nameValidationSchema.fields.name,
  phone: phoneSchema.fields.phone,
  email: emailValidationSchema.fields.email
});
