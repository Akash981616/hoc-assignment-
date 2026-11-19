import { useRef, useState, type ComponentType, type FormEvent } from 'react';
import * as yup from 'yup';

export type FormController<TValues extends object> = {
  values: TValues;
  errors: Partial<Record<keyof TValues, string>>;
  touched: Partial<Record<keyof TValues, boolean>>;
  isSubmitting: boolean;
  status: string;
  setFieldValue: (field: keyof TValues, value: string) => void;
  setFieldTouched: (field: keyof TValues) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

type FormProps<TValues extends object> = {
  form: FormController<TValues>;
};

type Options<TProps extends object, TValues extends object> = {
  initialValues: TValues;
  validationSchema: yup.AnyObjectSchema;
  onSubmit: (values: TValues, props: TProps) => void | Promise<void>;
};

function getErrors(error: yup.ValidationError): Record<string, string> {
  const issues = error.inner.length ? error.inner : [error];

  return issues.reduce<Record<string, string>>((errors, issue) => {
    if (issue.path && !errors[issue.path]) {
      errors[issue.path] = issue.message;
    }
    return errors;
  }, {});
}


export function withValidation<TProps extends object, TValues extends object>(
  WrappedComponent: ComponentType<TProps & FormProps<TValues>>,
  options: Options<TProps, TValues>,
): ComponentType<TProps> {
  function WithYupValidation(props: TProps) {
    const [values, setValues] = useState(options.initialValues);
    const [errors, setErrors] = useState<Partial<Record<keyof TValues, string>>>({});
    const [touched, setTouched] = useState<Partial<Record<keyof TValues, boolean>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState('');
    const validationId = useRef(0);

    async function validate(nextValues: TValues) {
      const currentValidation = ++validationId.current;

      try {
        await options.validationSchema.validate(nextValues, { abortEarly: false });
        if (currentValidation === validationId.current) setErrors({});
        return {};
      } catch (error) {
        if (!(error instanceof yup.ValidationError)) return {};

        const nextErrors = getErrors(error);
        if (currentValidation === validationId.current) {
          setErrors(nextErrors as Partial<Record<keyof TValues, string>>);
        }
        return nextErrors;
      }
    }

    function setFieldValue(field: keyof TValues, value: string) {
      const nextValues = { ...values, [field]: value };
      setValues(nextValues);
      setStatus('');

      if (touched[field]) void validate(nextValues);
    }

    function setFieldTouched(field: keyof TValues) {
      setTouched((current) => ({ ...current, [field]: true }));
      void validate(values);
    }

    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      const allTouched = {} as Partial<Record<keyof TValues, boolean>>;
      (Object.keys(values) as Array<keyof TValues>).forEach((field) => {
        allTouched[field] = true;
      });
      setTouched(allTouched);
      setStatus('');
      setIsSubmitting(true);

      try {
        const validationErrors = await validate(values);
        if (Object.keys(validationErrors).length) return;

        await options.onSubmit(values, props);
        setValues(options.initialValues);
        setTouched({});
        setErrors({});
        setStatus('Submitted successfully. Check the browser console for the form data.');
      } catch (error) {
        setStatus(error instanceof Error ? error.message : 'Unable to submit this form.');
      } finally {
        setIsSubmitting(false);
      }
    }

    const form: FormController<TValues> = {
      values,
      errors,
      touched,
      isSubmitting,
      status,
      setFieldValue,
      setFieldTouched,
      handleSubmit,
    };

    return <WrappedComponent {...props} form={form} />;
  }

  WithYupValidation.displayName = `withValidation(${WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component'})`;
  return WithYupValidation;
}
