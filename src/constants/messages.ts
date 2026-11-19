export const validationMessages = {
  emailRequired: 'Email is required.',
  emailInvalid: 'Enter a valid email address.',
  emailTooLong: 'Email must be 254 characters or fewer.',
  fieldRequired: (label: string) => `${label} is required.`,
  fieldTooShort: (label: string, length: number) => `${label} must be at least ${length} characters.`,
  fieldTooLong: (label: string, length: number) => `${label} must be ${length} characters or fewer.`,
  phoneInvalid: 'Enter a valid phone number.',
  categoryRequired: 'Choose a category.',
  categoryInvalid: 'Choose a valid category.',
  messageTooShort: 'Please provide at least 20 characters.',
  messageTooLong: 'Message must be 1000 characters or fewer.',
  skuInvalid: 'Use 3–20 uppercase letters, numbers, hyphens, or underscores.',
  quantityInvalid: 'Enter a whole number from 1 to 999999.',
  priceInvalid: 'Enter a price with up to 2 decimal places.',
  priceMustBePositive: 'Price must be greater than zero.',
};

export const submitMessages = {
  inProgress: 'Submitting…',
  success: 'Submitted successfully. Check the browser console for the form data.',
  failure: 'Unable to submit this form.',
};
