import { FormikErrors } from 'formik';

/**
 * @deprecated Replace with zod schemas validation
 */
export abstract class BaseFormValidation<T> {
  protected errors: FormikErrors<T> = {};

  constructor(protected values: T, protected readonly requiredFieldMsg: string) {}

  get erroneous(): boolean {
    return !!this.errors;
  }

  abstract validate(): FormikErrors<T>;
}
