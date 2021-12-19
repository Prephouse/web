import type { UserSignUpFormFields } from '../../schemas/user/signUpFormSchema';

export const initialValues: UserSignUpFormFields = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};
