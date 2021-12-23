import { FormikErrors } from 'formik';

/**
 * @deprecated Replace with zod schema validation
 */
export abstract class BaseFormValidation<T> {
  protected errors: FormikErrors<T> = {};

  protected constructor(protected values: T, protected readonly requiredFieldMsg: string) {}

  get erroneous(): boolean {
    return !!this.errors;
  }

  abstract validate(): FormikErrors<T>;
}
