import { BaseFormValidation } from "../../common/base-form-helper";
import {
  validateEmailAddressFormat,
  validatePasswordMinimumLength,
  validatePasswordUppercase,
  validatePasswordNumericality,
} from "../../../utils/validators";

export function retrievePasswordRequirements(password: string) {
  return Object.freeze([
    {
      passed: validatePasswordMinimumLength(password),
      failTextId: "user.registration.password.length",
    },
    {
      passed: validatePasswordUppercase(password),
      failTextId: "user.registration.password.oneUpper",
    },
    {
      passed: validatePasswordNumericality(password),
      failTextId: "user.registration.password.oneNumber",
    },
    // { passed: /^(?:(.)(?!\1{3}))*$/.test(password), failTextId: "user.registration.form.msg.password.requirement.consecutive"},
  ]);
}

export interface RegistrationFormValues {
  email: string;
  password: string;
  passwordConfirmation: string;
  firstName: string;
  lastName: string;
}

export const initialValues: RegistrationFormValues = {
  email: "",
  password: "",
  passwordConfirmation: "",
  firstName: "",
  lastName: ""
};

export class RegistrationFormValidation extends BaseFormValidation<RegistrationFormValues> {
  readonly #emailFormatErrorMsg: string = "";
  readonly #passwordMatchErrorMsg: string = "";
  readonly #onPasswordRequirementFailed: (x: string, errors: any) => typeof errors = () => {};

  constructor(
    values: RegistrationFormValues,
    requiredFieldMsg: string,
    emailFormatErrorMsg: string,
    passwordMatchErrorMsg: string,
    onPasswordRequirementFailed: (x: string, errors: any) => typeof errors
  ) {
    super(values, requiredFieldMsg);
    this.#emailFormatErrorMsg = emailFormatErrorMsg;
    this.#passwordMatchErrorMsg = passwordMatchErrorMsg;
    this.#onPasswordRequirementFailed = onPasswordRequirementFailed;
  }

  validateEmail() {
    if (!this.values.email) {
      this.errors.email = this.requiredFieldMsg;
    } else if (!validateEmailAddressFormat(this.values.email)) {
      this.errors.email = this.#emailFormatErrorMsg;
    }
  }

  validatePassword() {
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

  validatePasswordConfirmation() {
    if (!this.values.passwordConfirmation) {
      this.errors.passwordConfirmation = this.requiredFieldMsg;
    } else if (this.values.password !== this.values.passwordConfirmation) {
      this.errors.passwordConfirmation = this.#passwordMatchErrorMsg;
    }
  }

  private _validateCredentials() {
    this.validateEmail();
    this.validatePassword();
    this.validatePasswordConfirmation();
  }

  private _validatePersonal() {
    ["firstName", "lastName"].forEach(v => this.onlyCheckRequiredFilled(v));
  }

  validate = () => {
    this._validateCredentials();
    this._validatePersonal();
    return this.errors;
  };
}