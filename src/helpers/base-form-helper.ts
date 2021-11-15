import { FormikErrors } from 'formik';

export abstract class BaseFormValidation<T> {
  protected errors: FormikErrors<T> = {};

  public constructor(protected values: T, protected readonly requiredFieldMsg: string) {}

  get erroneous(): boolean {
    return !!this.errors;
  }

  abstract validate(): FormikErrors<T>;
}
