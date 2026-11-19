import { ValidatedProfileForm } from '../forms/forms';
import { formText } from '../constants/formText';
import type { ProfileValues } from '../types/forms';

export function FormWorkspace() {
  function logProfile(formName: string, values: ProfileValues) {
    console.log(`[${formName}]`, values);
  }

  return (
    <main className="page-shell">
      <section className="forms-column" aria-labelledby="profile-title">
        <nav className="form-switcher" aria-label={formText.navigationLabel}>
          <button className="form-switcher-button active" type="button" aria-current="page">
            {formText.profile.title}
          </button>
        </nav>

        <div className="form-card">
          <div className="card-heading">
            <h1 id="profile-title">{formText.profile.title}</h1>
          </div>
          <ValidatedProfileForm onSave={logProfile} />
        </div>
      </section>
    </main>
  );
}
