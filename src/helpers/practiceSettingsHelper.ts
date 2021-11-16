import { SessionMedium, SessionOrigin } from '../utils/enums';

import { BaseFormValidation } from './baseFormHelper';

export interface PracticeSettingsFormValues {
  medium: SessionMedium;
  origin: SessionOrigin;
  allowLiveFeedback: boolean;
}

export class PracticeSettingsFormValidation extends BaseFormValidation<PracticeSettingsFormValues> {
  validate = () => {
    if (!this.values.medium) {
      this.errors.medium = this.requiredFieldMsg;
    }

    if (!this.values.origin) {
      this.errors.origin = this.requiredFieldMsg;
    }

    if (!this.values.allowLiveFeedback) {
      this.errors.allowLiveFeedback = this.requiredFieldMsg;
    }

    return this.errors;
  };
}
