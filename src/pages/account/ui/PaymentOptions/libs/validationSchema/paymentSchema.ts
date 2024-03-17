//Core
import * as yup from 'yup';
//validationSchemas
import {
  cardNumberSchema,
  dateSchema,
  nameValidationSchema,
  securityCodeSchema
} from '@/shared/validationSchemas';

export const paymentOptionsValidationSchema = yup.object().shape({
  cardNumber: cardNumberSchema.fields.cardNumber,
  cardName: nameValidationSchema.fields.name,
  cardDate: dateSchema.fields.cardDate,
  securityCode: securityCodeSchema.fields.securityCode
});
