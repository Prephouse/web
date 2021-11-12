import { FormikErrors } from 'formik';

export abstract class BaseFormValidation<T> {
  protected errors: FormikErrors<T> = {};

  protected constructor(protected values: T, protected readonly requiredFieldMsg: string) {}

  get erroneous(): boolean {
    return !!this.errors;
  }

  onlyCheckRequiredFilled(fieldName: string) {
    // @ts-ignore
    if (!this.values[fieldName]) {
      // @ts-ignore
      this.errors[fieldName] = this.requiredFieldMsg;
    }
  }

  abstract validate(): FormikErrors<T>;
}
