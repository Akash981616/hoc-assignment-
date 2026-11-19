# Record Management Workspace

React + TypeScript workspace using **Yup** and a reusable higher-order component.

## Run locally

```bash
npm install
npm run dev
```

Create a production build with `npm run build`.

## Forms

Profile and Support Request forms use the same `withValidation` wrapper and shared field component. Each has its own Yup schema, initial values, and submit handler, so the HOC is reusable across different data shapes. After successful validation, each handler logs its form name and values to the browser console.

- `src/hoc/withValidation.tsx` wraps a form view with shared state and Yup validation.
- `src/forms/forms.tsx` configures both forms with their own schema and submit behavior.
- `src/components/FormInput.tsx` contains one reusable input, select, and textarea field with accessible validation feedback.
- `src/validation/common.ts` holds the per-form Yup schemas.
- `src/types/` contains all TypeScript types.
- `src/constants/` contains validation, submit, and form text.
- `src/components/FormWorkspace.tsx` selects a form and reports successful submissions.

The submit handlers are easy to replace with API requests when a server is available. Keep server-side validation in place when integrating a backend.
