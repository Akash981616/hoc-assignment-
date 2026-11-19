import { ValidatedProfileForm } from '../forms/forms';
import type { ProfileValues } from '../validation/common';

export function FormWorkspace() {
  function logProfile(formName: string, values: ProfileValues) {
    console.log(`[${formName}]`, values);
  }

  return (
    <main className="page-shell">
      <section className="forms-column" aria-labelledby="profile-title">
        <nav className="form-switcher" aria-label="Form">
          <button className="form-switcher-button active" type="button" aria-current="page">
            Profile details
          </button>
        </nav>

        <div className="form-card">
          <div className="card-heading">
            <h1 id="profile-title">Profile details</h1>
          </div>
          <ValidatedProfileForm onSave={logProfile} />
        </div>
      </section>
    </main>
  );
}
