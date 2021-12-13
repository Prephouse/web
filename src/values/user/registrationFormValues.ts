import type { UserRegistrationFormFields } from '../../schema/user/registrationFormSchema';

export const initialValues: UserRegistrationFormFields = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};
