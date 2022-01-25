import { Field, Form, Formik } from 'formik';
import { FormEvent } from 'react';
import { useIntl } from 'react-intl';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { DateTimePicker } from '@mui/lab';
import { TextField } from '@mui/material';

import FormButtons from 'components/common/FormButtons';
import FormGroupCompact from 'components/common/FormGroupCompact';
import FormInput from 'components/common/FormInput';

import { getFormValidationSchema } from 'schemas/support/bugReportFormSchema';

import initialValues from 'values/support/bugReportFormValues';

const BugReportForm = () => {
  const intl = useIntl();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => {}}
      validationSchema={toFormikValidationSchema(getFormValidationSchema(intl))}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ values, errors, touched, setFieldValue, submitForm }) => {
        const onSubmit = (event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          submitForm();
        };

        // noinspection RequiredAttributes
        return (
          <Form onSubmit={onSubmit}>
            <FormGroupCompact>
              <Field
                as={FormInput}
                name="title"
                label={intl.formatMessage({ id: 'support.bugReport.title' })}
                required
                errorMsg={errors.title}
              />
              <Field
                as={FormInput}
                name="description"
                label={intl.formatMessage({ id: 'support.bugReport.description' })}
                multiline
                rows={10}
                errorMsg={errors.description}
                helperText={intl.formatMessage({ id: 'support.bugReport.description.help' })}
              />
              <DateTimePicker
                renderInput={props => (
                  <TextField
                    {...props}
                    helperText={
                      errors.date && touched.date
                        ? intl.formatMessage({ id: 'support.bugReport.time.future' })
                        : intl.formatMessage({ id: 'support.bugReport.time.help' })
                    }
                  />
                )}
                label={intl.formatMessage({ id: 'support.bugReport.time' })}
                value={values.date}
                onChange={newValue => {
                  setFieldValue('date', newValue, false);
                }}
                maxDateTime={new Date()}
                showTodayButton
              />
            </FormGroupCompact>
            <FormButtons primaryText={intl.formatMessage({ id: 'common.submit' })} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default BugReportForm;
