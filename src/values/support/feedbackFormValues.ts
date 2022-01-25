import type { FeedbackFormFields } from 'schemas/support/feedbackFormSchema';
import { FeedbackCategory } from 'schemas/support/feedbackFormSchema';

const initialValues: FeedbackFormFields = {
  category: FeedbackCategory.options[0],
  title: '',
  description: '',
};

export default initialValues;
