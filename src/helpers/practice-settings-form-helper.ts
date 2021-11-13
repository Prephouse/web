import { SessionMedium, SessionOrigin } from '../utils/enums';

import { BaseFormValidation } from './base-form-helper';

export interface PracticeSettingsFormValues {
  medium: SessionMedium;
  origin: SessionOrigin;
  allowLiveFeedback: boolean;
}

export class PracticeSettingsFormValidation extends BaseFormValidation<PracticeSettingsFormValues> {
  constructor(values: PracticeSettingsFormValues, requiredFieldMsg: string) {
    super(values, requiredFieldMsg);
  }

  validate = () => {
    if (this.values.medium === null) {
      this.errors.medium = this.requiredFieldMsg;
    }

    if (this.values.origin === null) {
      this.errors.origin = this.requiredFieldMsg;
    }

    if (this.values.allowLiveFeedback === null) {
      this.errors.allowLiveFeedback = this.requiredFieldMsg;
    }

    return this.errors;
  };
}
