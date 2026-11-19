import { useRef, useState, type ComponentType, type FormEvent } from 'react';
import * as yup from 'yup';

type Errors<T> = Partial<Record<keyof T, string>>;

export type FormController<T extends object> = {
  values: T;
  errors: Errors<T>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  status: string;
  setFieldValue: (field: keyof T, value: string) => void;
  setFieldTouched: (field: keyof T) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

type FormProps<T extends object> = { form: FormController<T> };

type Options<P extends object, T extends object> = {
  initialValues: T;
  validationSchema: yup.AnyObjectSchema;
  onSubmit: (values: T, props: P) => void | Promise<void>;
};

type State<T extends object> = {
  values: T;
  errors: Errors<T>;
  touched: Partial<Record<keyof T, boolean>>;
  isSubmitting: boolean;
  status: string;
};

function getErrors(error: yup.ValidationError): Record<string, string> {
  const issues = error.inner.length ? error.inner : [error];
  const errors: Record<string, string> = {};

  for (const issue of issues) {
    if (issue.path && !errors[issue.path]) errors[issue.path] = issue.message;
  }

  return errors;
}

/** Shares form state and Yup validation across form components. */
export function withValidation<P extends object, T extends object>(
  FormComponent: ComponentType<P & FormProps<T>>,
  options: Options<P, T>,
): ComponentType<P> {
  function ValidatedForm(props: P) {
    const [state, setState] = useState<State<T>>({
      values: options.initialValues,
      errors: {},
      touched: {},
      isSubmitting: false,
      status: '',
    });
    const validationId = useRef(0);

    async function validate(values: T): Promise<Record<string, string> | null> {
      const currentId = ++validationId.current;
      let errors: Record<string, string> = {};

      try {
        await options.validationSchema.validate(values, { abortEarly: false });
      } catch (error) {
        if (error instanceof yup.ValidationError) errors = getErrors(error);
      }

      if (currentId !== validationId.current) return null;
      setState((current) => ({ ...current, errors: errors as Errors<T> }));
      return errors;
    }

    function setFieldValue(field: keyof T, value: string) {
      const values = { ...state.values, [field]: value };
      setState((current) => ({ ...current, values, status: '' }));
      if (state.touched[field]) void validate(values);
    }

    function setFieldTouched(field: keyof T) {
      setState((current) => ({
        ...current,
        touched: { ...current.touched, [field]: true },
      }));
      void validate(state.values);
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      const touched = {} as Partial<Record<keyof T, boolean>>;
      (Object.keys(state.values) as Array<keyof T>).forEach((field) => {
        touched[field] = true;
      });
      setState((current) => ({ ...current, touched, status: '', isSubmitting: true }));

      try {
        const errors = await validate(state.values);
        if (errors === null || Object.keys(errors).length > 0) return;

        await options.onSubmit(state.values, props);
        setState({
          values: options.initialValues,
          errors: {},
          touched: {},
          isSubmitting: true,
          status: 'Submitted successfully. Check the browser console for the form data.',
        });
      } catch (error) {
        setState((current) => ({
          ...current,
          status: error instanceof Error ? error.message : 'Unable to submit this form.',
        }));
      } finally {
        setState((current) => ({ ...current, isSubmitting: false }));
      }
    }

    const form: FormController<T> = {
      values: state.values,
      errors: state.errors,
      touched: state.touched,
      isSubmitting: state.isSubmitting,
      status: state.status,
      setFieldValue,
      setFieldTouched,
      handleSubmit,
    };

    return <FormComponent {...props} form={form} />;
  }

  ValidatedForm.displayName = `withValidation(${FormComponent.displayName ?? FormComponent.name ?? 'Component'})`;
  return ValidatedForm;
}
