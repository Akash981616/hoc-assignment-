import * as yup from 'yup';


export const commonRules = {
  email: yup
    .string()
    .trim()
    .required('Email is required.')
    .email('Enter a valid email address.')
    .max(254, 'Email must be 254 characters or fewer.'),
  text: (label: string) => yup
    .string()
    .trim()
    .required(`${label} is required.`)
    .min(2, `${label} must be at least 2 characters.`)
    .max(120, `${label} must be 120 characters or fewer.`),
};

export const profileSchema = yup.object({
  fullName: commonRules.text('Full name'),
  email: commonRules.email,
  phone: yup
    .string()
    .trim()
    .required('Phone number is required.')
    .matches(/^\+?[0-9\s()-]{7,20}$/, 'Enter a valid phone number.'),
}).required();

export const supportSchema = yup.object({
  email: commonRules.email,
  category: yup
    .string()
    .required('Choose a category.')
    .test('category', 'Choose a valid category.', (value) => !value || ['account', 'billing', 'technical'].includes(value)),
  subject: commonRules.text('Subject'),
  message: yup
    .string()
    .trim()
    .required('Describe the issue.')
    .min(20, 'Please provide at least 20 characters.')
    .max(1000, 'Message must be 1000 characters or fewer.'),
}).required();

export const inventorySchema = yup.object({
  productName: commonRules.text('Product name'),
  sku: yup
    .string()
    .trim()
    .required('SKU is required.')
    .matches(/^[A-Z0-9][A-Z0-9_-]{2,19}$/, 'Use 3–20 uppercase letters, numbers, hyphens, or underscores.'),
  quantity: yup
    .string()
    .required('Quantity is required.')
    .matches(/^[1-9]\d{0,5}$/, 'Enter a whole number from 1 to 999999.'),
  price: yup
    .string()
    .required('Price is required.')
    .matches(/^(?:0|[1-9]\d{0,7})(?:\.\d{1,2})?$/, 'Enter a price with up to 2 decimal places.')
    .test('positive', 'Price must be greater than zero.', (value) => Number(value) > 0),
}).required();

export type ProfileValues = yup.InferType<typeof profileSchema>;
export type SupportValues = yup.InferType<typeof supportSchema>;
export type InventoryValues = yup.InferType<typeof inventorySchema>;
