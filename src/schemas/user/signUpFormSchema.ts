import { IntlShape } from 'react-intl';
import { z } from 'zod';

import {
  validatePasswordMinimumLength,
  validatePasswordNumericality,
  validatePasswordUppercase,
} from 'utils/validators';

export const getFormValidationSchema = (intl: IntlShape) => {
  const z1 = z.string({
    required_error: intl.formatMessage({ id: 'common.field.required' }),
  });
  return z
    .object({
      firstName: z1,
      lastName: z1,
      email: z1.email({
        message: intl.formatMessage({ id: 'user.signup.email.error' }),
      }),
      password: z1,
      passwordConfirmation: z1,
    })
    .refine(({ password }) => validatePasswordMinimumLength(password), {
      message: intl.formatMessage({ id: 'user.signup.password.length' }),
      path: ['password'],
    })
    .refine(({ password }) => validatePasswordUppercase(password), {
      message: intl.formatMessage({ id: 'user.signup.password.oneUpper' }),
      path: ['password'],
    })
    .refine(({ password }) => validatePasswordNumericality(password), {
      message: intl.formatMessage({ id: 'user.signup.password.oneNumber' }),
      path: ['password'],
    })
    .refine(({ password, passwordConfirmation }) => password === passwordConfirmation, {
      message: intl.formatMessage({ id: 'user.signup.password.match' }),
      path: ['passwordConfirmation'],
    });
};

export type UserSignUpFormFields = z.infer<ReturnType<typeof getFormValidationSchema>>;
