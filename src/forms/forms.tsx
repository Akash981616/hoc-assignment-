import { FormInput } from '../components/FormInput';
import { formText } from '../constants/formText';
import { submitMessages } from '../constants/messages';
import { withValidation } from '../hoc/withValidation';
import type {
  FormController,
  FormProps,
  ProfileValues,
  SaveProps,
  SupportValues,
} from '../types/forms';
import type { FormShellProps } from '../types/fields';
import { profileSchema, supportSchema } from '../validation/common';

function fieldProps<T extends object, K extends keyof T>(
  form: FormController<T>,
  name: K,
) {
  return {
    name: String(name),
    value: String(form.values[name] ?? ''),
    error: form.errors[name],
    touched: Boolean(form.touched[name]),
    onValueChange: (value: string) => form.setFieldValue(name, value),
    onBlur: () => form.setFieldTouched(name),
  };
}

function FormShell<T extends object>({
  form,
  children,
  buttonText,
}: FormShellProps<T>) {
  return (
    <form noValidate onSubmit={form.handleSubmit}>
      {children}
      {form.status && <p className="success-message" role="status">{form.status}</p>}
      <button className="submit-button" type="submit" disabled={form.isSubmitting}>
        {form.isSubmitting ? submitMessages.inProgress : buttonText}
      </button>
    </form>
  );
}

function ProfileForm({ form }: SaveProps<ProfileValues> & FormProps<ProfileValues>) {
  return (
    <FormShell form={form} buttonText={formText.profile.button}>
      <FormInput
        label={formText.profile.fields.fullName}
        autoComplete="name"
        {...fieldProps(form, 'fullName')}
      />
      <FormInput
        label={formText.profile.fields.email}
        type="email"
        autoComplete="email"
        {...fieldProps(form, 'email')}
      />
      <FormInput
        label={formText.profile.fields.phone}
        type="tel"
        autoComplete="tel"
        {...fieldProps(form, 'phone')}
      />
    </FormShell>
  );
}

function SupportForm({ form }: SaveProps<SupportValues> & FormProps<SupportValues>) {
  return (
    <FormShell form={form} buttonText={formText.support.button}>
      <FormInput
        label={formText.support.fields.email}
        type="email"
        autoComplete="email"
        {...fieldProps(form, 'email')}
      />
      <FormInput
        label={formText.support.fields.category}
        options={formText.categories}
        {...fieldProps(form, 'category')}
      />
      <FormInput label={formText.support.fields.subject} {...fieldProps(form, 'subject')} />
      <FormInput
        label={formText.support.fields.message}
        multiline
        hint={formText.support.messageHint}
        {...fieldProps(form, 'message')}
      />
    </FormShell>
  );
}

export const ValidatedProfileForm = withValidation<SaveProps<ProfileValues>, ProfileValues>(
  ProfileForm,
  {
    initialValues: { fullName: '', email: '', phone: '' },
    validationSchema: profileSchema,
    onSubmit: (values, props) => props.onSave(formText.profile.name, values),
  },
);

export const ValidatedSupportForm = withValidation<SaveProps<SupportValues>, SupportValues>(
  SupportForm,
  {
    initialValues: { email: '', category: '', subject: '', message: '' },
    validationSchema: supportSchema,
    onSubmit: (values, props) => props.onSave(formText.support.name, values),
  },
);
