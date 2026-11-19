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
    button: 'Submit request',
    fields: {
      email: 'Reply email',
      category: 'Request category',
      subject: 'Subject',
      message: 'Details',
    },
    messageHint: 'Describe the request in at least 20 characters.',
  },
  inventory: {
    name: 'Inventory item',
    button: 'Submit item',
    fields: {
      productName: 'Product name',
      sku: 'SKU',
      quantity: 'Quantity',
      price: 'Unit price (USD)',
    },
    skuHint: 'Use 3–20 uppercase letters, numbers, hyphens, or underscores.',
  },
  categories: [
    { value: 'account', label: 'Account access' },
    { value: 'billing', label: 'Billing' },
    { value: 'technical', label: 'Technical issue' },
  ],
};
