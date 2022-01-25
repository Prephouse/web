import type { BugReportFormFields } from 'schemas/support/bugReportFormSchema';

const initialValues: BugReportFormFields = {
  title: '',
  description: '',
  date: new Date(),
};

export default initialValues;
