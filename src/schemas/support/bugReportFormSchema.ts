import { IntlShape } from 'react-intl';
import { z } from 'zod';

export const getFormValidationSchema = (intl: IntlShape) => {
  const z1 = z.string({
    required_error: intl.formatMessage({ id: 'common.field.required' }),
  });
  return z.object({
    title: z1,
    description: z.string().optional(),
    date: z.date().refine(val => val.getTime() <= Date.now(), {
      path: ['date'],
    }),
  });
};

export type BugReportFormFields = z.infer<ReturnType<typeof getFormValidationSchema>>;
