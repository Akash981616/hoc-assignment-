export const formText = {
  navigationLabel: 'Form',
  selectPrompt: 'Select one…',
  profile: {
    name: 'Profile',
    title: 'Profile details',
    button: 'Submit profile',
    fields: { fullName: 'Full name', email: 'Work email', phone: 'Phone number' },
  },
  support: {
    name: 'Support request',
    title: 'Support request',
    button: 'Submit request',
    fields: {
      email: 'Reply email',
      category: 'Request category',
      subject: 'Subject',
      message: 'Details',
    },
    messageHint: 'Describe the request in at least 20 characters.',
  },
  categories: [
    { value: 'account', label: 'Account access' },
    { value: 'billing', label: 'Billing' },
    { value: 'technical', label: 'Technical issue' },
  ],
};
