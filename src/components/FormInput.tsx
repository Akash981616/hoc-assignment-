import type { ChangeEvent } from 'react';
import { formText } from '../constants/formText';
import type { FormFieldProps } from '../types/fields';


export function FormInput({
  name,
  label,
  value,
  error,
  touched,
  onValueChange,
  onBlur,
  type = 'text',
  autoComplete,
  hint,
  options,
  multiline = false,
}: FormFieldProps) {
  const id = `field-${name}`;
  const errorId = `${id}-error`;
  const hintId = `${id}-hint`;
  const showError = touched && Boolean(error);
  const description = [hint ? hintId : null, showError ? errorId : null]
    .filter(Boolean)
    .join(' ') || undefined;

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    onValueChange(event.currentTarget.value);
  }

  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      {hint && <p className="hint" id={hintId}>{hint}</p>}

      {options ? (
        <select
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          aria-invalid={showError}
          aria-describedby={description}
        >
          <option value="">{formText.selectPrompt}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : multiline ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          aria-invalid={showError}
          aria-describedby={description}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          autoComplete={autoComplete}
          value={value}
          onChange={handleChange}
          onBlur={onBlur}
          aria-invalid={showError}
          aria-describedby={description}
        />
      )}

      {showError && (
        <p className="field-error" id={errorId} role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
