import * as yup from 'yup';
import { formText } from '../constants/formText';
import { validationMessages } from '../constants/messages';
import type { ProfileValues, SupportValues } from '../types/forms';

export const commonRules = {
  email: yup
    .string()
    .trim()
    .required(validationMessages.emailRequired)
    .email(validationMessages.emailInvalid)
    .max(254, validationMessages.emailTooLong),

  text: (label: string) => yup
    .string()
    .trim()
    .required(validationMessages.fieldRequired(label))
    .min(2, validationMessages.fieldTooShort(label, 2))
    .max(120, validationMessages.fieldTooLong(label, 120)),
};

export const profileSchema: yup.ObjectSchema<ProfileValues> = yup.object({
  fullName: commonRules.text(formText.profile.fields.fullName),
  email: commonRules.email,
  phone: yup
    .string()
    .trim()
    .required(validationMessages.fieldRequired(formText.profile.fields.phone))
    .matches(/^\+?[0-9\s()-]{7,20}$/, validationMessages.phoneInvalid),
}).required();

export const supportSchema: yup.ObjectSchema<SupportValues> = yup.object({
  email: commonRules.email,
  category: yup
    .string()
    .required(validationMessages.categoryRequired)
    .test(
      'category',
      validationMessages.categoryInvalid,
      (value) => !value || formText.categories.some((category) => category.value === value),
    ),
  subject: commonRules.text(formText.support.fields.subject),
  message: yup
    .string()
    .trim()
    .required(validationMessages.fieldRequired(formText.support.fields.message))
    .min(20, validationMessages.messageTooShort)
    .max(1000, validationMessages.messageTooLong),
}).required();

