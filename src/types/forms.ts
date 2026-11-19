import type { ComponentType, FormEvent } from 'react';
import type { Schema } from 'yup';

export type ProfileValues = {
  fullName: string;
  email: string;
  phone: string;
};

export type SupportValues = {
  email: string;
  category: string;
  subject: string;
  message: string;
};

export type FormId = 'profile' | 'support';
export type FieldErrors<T extends object> = Partial<Record<keyof T, string>>;
export type TouchedFields<T extends object> = Partial<Record<keyof T, boolean>>;

export type FormController<T extends object> = {
  values: T;
  errors: FieldErrors<T>;
  touched: TouchedFields<T>;
  isSubmitting: boolean;
  status: string;
  setFieldValue: (field: keyof T, value: string) => void;
  setFieldTouched: (field: keyof T) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

export type FormProps<T extends object> = { form: FormController<T> };
export type SaveProps<T> = { onSave: (formName: string, values: T) => void };

export type FormState<T extends object> = {
  values: T;
  errors: FieldErrors<T>;
  touched: TouchedFields<T>;
  isSubmitting: boolean;
  status: string;
};

export type ValidationHocOptions<TProps extends object, TValues extends object> = {
  initialValues: TValues;
  validationSchema: Schema<TValues>;
  onSubmit: (values: TValues, props: TProps) => void | Promise<void>;
};

export type ValidatedFormComponent<TProps extends object, TValues extends object> =
  ComponentType<TProps & FormProps<TValues>>;
