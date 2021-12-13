import { IntlShape } from 'react-intl';
import { z } from 'zod';

import { SessionMedium, SessionOrigin } from '../../utils/enums';

export const getFormValidationSchema = (intl: IntlShape) => {
  const fieldParams = {
    required_error: intl.formatMessage({ id: 'common.form.field.required' }),
    invalid_type_error: '', // TODO write up an useful invalid type error message
  };
  return z.object({
    medium: z.nativeEnum(SessionMedium, fieldParams),
    origin: z.nativeEnum(SessionOrigin, fieldParams),
    allowLiveFeedback: z.boolean(fieldParams),
  });
};

export type PracticeFormSchema = z.infer<ReturnType<typeof getFormValidationSchema>>;
