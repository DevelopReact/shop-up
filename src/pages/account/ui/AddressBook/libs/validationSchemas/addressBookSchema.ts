//Core
import * as yup from 'yup';
//lib
import {
  messageSchema,
  nameValidationSchema,
  postCodeSchema
} from '@/shared/validationSchemas';

export const addressBookValidationSchema = yup.object().shape({
  country: nameValidationSchema.fields.name,
  city: nameValidationSchema.fields.name,
  bookAddress: yup.string().required('*'),
  postCode: postCodeSchema.fields.postCode,
  notions: messageSchema.fields.message
});
