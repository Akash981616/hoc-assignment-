import { useState } from 'react';
import { formText } from '../constants/formText';
import { ValidatedProfileForm, ValidatedSupportForm } from '../forms/forms';
import type { FormId } from '../types/forms';

export function FormWorkspace() {
  const [activeForm, setActiveForm] = useState<FormId>('profile');

  function logForm(formName: string, values: object) {
    console.log(`[${formName}]`, values);
  }

  const title = activeForm === 'profile'
    ? formText.profile.title
    : formText.support.title;

  return (
    <main className="page-shell">
      <section className="forms-column" aria-labelledby="form-title">
        <nav className="form-switcher" aria-label={formText.navigationLabel}>
          <button
            className={`form-switcher-button${activeForm === 'profile' ? ' active' : ''}`}
            type="button"
            aria-pressed={activeForm === 'profile'}
            onClick={() => setActiveForm('profile')}
          >
            {formText.profile.title}
          </button>
          <button
            className={`form-switcher-button${activeForm === 'support' ? ' active' : ''}`}
            type="button"
            aria-pressed={activeForm === 'support'}
            onClick={() => setActiveForm('support')}
          >
            {formText.support.title}
          </button>
        </nav>

        <div className="form-card">
          <div className="card-heading">
            <h1 id="form-title">{title}</h1>
          </div>
          {activeForm === 'profile' && <ValidatedProfileForm onSave={logForm} />}
          {activeForm === 'support' && <ValidatedSupportForm onSave={logForm} />}
        </div>
      </section>
    </main>
  );
}
