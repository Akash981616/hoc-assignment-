import { useRef, useState, type ComponentType, type FormEvent } from 'react';
import * as yup from 'yup';
import { submitMessages } from '../constants/messages';
import type {
  FieldErrors,
 
  FormState,
  ValidatedFormComponent,
  ValidationHocOptions,
} from '../types/forms';

function getErrors(error: yup.ValidationError): Record<string, string> {
  const issues = error.inner.length ? error.inner : [error];
  const errors: Record<string, string> = {};

  for (const issue of issues) {
    if (issue.path && !errors[issue.path]) errors[issue.path] = issue.message;
  }

  return errors;
}


export function withValidation<P extends object, T extends object>(
  FormComponent: ValidatedFormComponent<P, T>,
  options: ValidationHocOptions<P, T>,
): ComponentType<P> {
  function ValidatedForm(props: P) {
    const [state, setState] = useState<FormState<T>>({
      values: options.initialValues,
      errors: {},
      touched: {},
      isSubmitting: false,
      status: '',
    });
    const validationId = useRef(0);

    async function validate(values: T): Promise<Record<string, string> | null> {
      const currentId = validationId.current;
      let errors: Record<string, string> = {};

      try {
        await options.validationSchema.validate(values, { abortEarly: false });
      } catch (error) {
        if (error instanceof yup.ValidationError) errors = getErrors(error);
      }

      if (currentId !== validationId.current) return null;
      setState((current) => ({ ...current, errors: errors as FieldErrors<T> }));
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
          status: submitMessages.success,
        });
      } catch (error) {
        setState((current) => ({
          ...current,
          status: error instanceof Error ? error.message : submitMessages.failure,
        }));
      } finally {
        setState((current) => ({ ...current, isSubmitting: false }));
      }
    }

    const form = {
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
