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
};

export const submitMessages = {
  inProgress: 'Submitting…',
  success: 'Submitted successfully. Check the browser console for the form data.',
  failure: 'Unable to submit this form.',
};
