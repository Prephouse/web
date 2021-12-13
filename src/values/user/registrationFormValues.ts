import type { UserRegistrationFormFields } from '../../schemas/user/registrationFormSchema';

export const initialValues: UserRegistrationFormFields = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};
