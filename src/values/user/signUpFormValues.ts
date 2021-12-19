import type { UserSignUpFormFields } from '../../schemas/user/signUpFormSchema';

const initialValues: UserSignUpFormFields = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConfirmation: '',
};

export default initialValues;
