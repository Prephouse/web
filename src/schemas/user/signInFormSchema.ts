import { IntlShape } from 'react-intl';
import { z } from 'zod';

export const getCredentials = (intl: IntlShape) => {
  const z1 = z.string({
    required_error: intl.formatMessage({ id: 'common.field.required' }),
  });
  return z.object({
    email: z1.email({
      message: intl.formatMessage({ id: 'user.signin.email.error' }),
    }),
    password: z1,
  });
};

export type UserSignInFormFields = z.infer<ReturnType<typeof getCredentials>>;
