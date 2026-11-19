import type { ReactNode } from 'react';
import { FormInput } from '../components/FormInput';
import { withValidation, type FormController } from '../hoc/withValidation';
import {
  inventorySchema,
  profileSchema,
  supportSchema,
  type InventoryValues,
  type ProfileValues,
  type SupportValues,
} from '../validation/common';

type SaveProps<TValues> = { onSave: (formName: string, values: TValues) => void };
type FormProps<TValues extends object> = SaveProps<TValues> & { form: FormController<TValues> };

function fieldProps<TValues extends object, TField extends keyof TValues>(form: FormController<TValues>, name: TField) {
  return {
    name: String(name),
    value: String(form.values[name] ?? ''),
    error: form.errors[name],
    touched: Boolean(form.touched[name]),
    onValueChange: (value: string) => form.setFieldValue(name, value),
    onBlur: () => form.setFieldTouched(name),
  };
}

function FormShell<TValues extends object>({ form, children, buttonText }: { form: FormController<TValues>; children: ReactNode; buttonText: string }) {
  return (
    <form noValidate onSubmit={form.handleSubmit}>
      {children}
      {form.status && <p className="success-message" role="status">{form.status}</p>}
      <button className="submit-button" type="submit" disabled={form.isSubmitting}>
        {form.isSubmitting ? 'Submitting…' : buttonText}
      </button>
    </form>
  );
}

function ProfileForm({ form }: FormProps<ProfileValues>) {
  return (
    <FormShell form={form} buttonText="Submit profile">
      <FormInput label="Full name" type="text" autoComplete="name" {...fieldProps(form, 'fullName')} />
      <FormInput label="Work email" type="email" autoComplete="email" {...fieldProps(form, 'email')} />
      <FormInput label="Phone number" type="tel" autoComplete="tel" {...fieldProps(form, 'phone')} />
    </FormShell>
  );
}

function SupportForm({ form }: FormProps<SupportValues>) {
  return (
    <FormShell form={form} buttonText="Submit request">
      <FormInput label="Reply email" type="email" autoComplete="email" {...fieldProps(form, 'email')} />
      <FormInput
        label="Request category"
        options={[
          { value: 'account', label: 'Account access' },
          { value: 'billing', label: 'Billing' },
          { value: 'technical', label: 'Technical issue' },
        ]}
        {...fieldProps(form, 'category')}
      />
      <FormInput label="Subject" {...fieldProps(form, 'subject')} />
      <FormInput label="Details" multiline hint="Describe the request in at least 20 characters." {...fieldProps(form, 'message')} />
    </FormShell>
  );
}

function InventoryForm({ form }: FormProps<InventoryValues>) {
  return (
    <FormShell form={form} buttonText="Submit item">
      <FormInput label="Product name" {...fieldProps(form, 'productName')} />
      <FormInput label="SKU" hint="Use 3–20 uppercase letters, numbers, hyphens, or underscores." {...fieldProps(form, 'sku')} />
      <div className="field-row">
        <FormInput label="Quantity" {...fieldProps(form, 'quantity')} />
        <FormInput label="Unit price (USD)" {...fieldProps(form, 'price')} />
      </div>
    </FormShell>
  );
}

export const ValidatedProfileForm = withValidation<SaveProps<ProfileValues>, ProfileValues>(ProfileForm, {
  initialValues: { fullName: '', email: '', phone: '' },
  validationSchema: profileSchema,
  onSubmit: (values, props) => props.onSave('Profile', values),
});

export const ValidatedSupportForm = withValidation<SaveProps<SupportValues>, SupportValues>(SupportForm, {
  initialValues: { email: '', category: '', subject: '', message: '' },
  validationSchema: supportSchema,
  onSubmit: (values, props) => props.onSave('Support request', values),
});

export const ValidatedInventoryForm = withValidation<SaveProps<InventoryValues>, InventoryValues>(InventoryForm, {
  initialValues: { productName: '', sku: '', quantity: '', price: '' },
  validationSchema: inventorySchema,
  onSubmit: (values, props) => props.onSave('Inventory item', values),
});
