import { IntlShape } from 'react-intl';
import { z } from 'zod';

export const FeedbackCategory = z.enum([
  'support.feedback.category.accessibility',
  'support.feedback.category.feedback',
  'support.feedback.category.localization',
  'support.feedback.category.practice',
  'support.feedback.category.signin',
  'support.feedback.category.signup',
]);

export const getFormValidationSchema = (intl: IntlShape) => {
  const z1 = z.string({
    required_error: intl.formatMessage({ id: 'common.field.required' }),
  });
  return z.object({
    category: FeedbackCategory,
    title: z1,
    description: z.string().optional(),
  });
};

export type FeedbackFormFields = z.infer<ReturnType<typeof getFormValidationSchema>>;
