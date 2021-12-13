import { FormikErrors } from 'formik';

import {
  validateEmailAddressFormat,
  validatePasswordMinimumLength,
  validatePasswordNumericality,
  validatePasswordUppercase,
} from '../utils/validators';

import { BaseFormValidation } from './baseFormHelper';

export function retrievePasswordRequirements(password: string) {
  return Object.freeze([
    {
      passed: validatePasswordMinimumLength(password),
      failTextId: 'user.registration.password.length',
    },
    {
      passed: validatePasswordUppercase(password),
      failTextId: 'user.registration.password.oneUpper',
    },
    {
      passed: validatePasswordNumericality(password),
      failTextId: 'user.registration.password.oneNumber',
    },
  ]);
}

export interface RegistrationFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export const initialValues: RegistrationFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

export class RegistrationFormValidation extends BaseFormValidation<RegistrationFormValues> {
  readonly #emailFormatErrorMsg: string = '';

  readonly #passwordMatchErrorMsg: string = '';

  readonly #onPasswordRequirementFailed: (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    errorMsgId: string,
    errors: FormikErrors<RegistrationFormValues>
  ) => typeof errors;

  constructor(
    values: RegistrationFormValues,
    requiredFieldMsg: string,
    emailFormatErrorMsg: string,
    passwordMatchErrorMsg: string,
    onPasswordRequirementFailed: (
      errorMsgId: string,
      errors: FormikErrors<RegistrationFormValues>
    ) => typeof errors
  ) {
    super(values, requiredFieldMsg);
    this.#emailFormatErrorMsg = emailFormatErrorMsg;
    this.#passwordMatchErrorMsg = passwordMatchErrorMsg;
    this.#onPasswordRequirementFailed = onPasswordRequirementFailed;
  }

  private _validateName() {
    if (!this.values.firstName) {
      this.errors.firstName = this.requiredFieldMsg;
    }
    if (!this.values.lastName) {
      this.errors.lastName = this.requiredFieldMsg;
    }
  }

  private _validateEmail() {
    if (!this.values.email) {
      this.errors.email = this.requiredFieldMsg;
    } else if (!validateEmailAddressFormat(this.values.email)) {
      this.errors.email = this.#emailFormatErrorMsg;
    }
  }

  private _validatePassword() {
    if (!this.values.password) {
      this.errors.password = this.requiredFieldMsg;
    } else {
      retrievePasswordRequirements(this.values.password).forEach(requirement => {
        if (!requirement.passed) {
          this.errors = this.#onPasswordRequirementFailed(requirement.failTextId, this.errors);
        }
      });
    }
  }

  private _validatePasswordConfirmation() {
    if (!this.values.passwordConfirmation) {
      this.errors.passwordConfirmation = this.requiredFieldMsg;
    } else if (this.values.password !== this.values.passwordConfirmation) {
      this.errors.passwordConfirmation = this.#passwordMatchErrorMsg;
    }
  }

  validate = () => {
    this._validateName();
    this._validateEmail();
    this._validatePassword();
    this._validatePasswordConfirmation();

    return this.errors;
  };
}
