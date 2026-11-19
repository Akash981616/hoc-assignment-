import type { ReactNode } from 'react';
import type { FormController } from './forms';

export type SelectOption = {
  value: string;
  label: string;
};

export type FormFieldProps = {
  name: string;
  label: string;
  value: string;
  error?: string;
  touched: boolean;
  onValueChange: (value: string) => void;
  onBlur: () => void;
  type?: 'text' | 'email' | 'tel';
  autoComplete?: string;
  hint?: string;
  options?: SelectOption[];
  multiline?: boolean;
};

export type FormShellProps<TValues extends object> = {
  form: FormController<TValues>;
  children: ReactNode;
  buttonText: string;
};
