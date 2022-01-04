import { Field, Form, Formik } from 'formik';
import { FormEvent } from 'react';
import { useIntl } from 'react-intl';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { Autocomplete, TextField } from '@mui/material';

import {
  FeedbackCategory,
  getFormValidationSchema,
} from '../../schemas/support/feedbackFormSchema';

import initialValues from '../../values/support/feedbackFormValues';

import FormButtons from '../common/FormButtons';
import FormGroupCompact from '../common/FormGroupCompact';
import FormInput from '../common/FormInput';

const FeedbackForm = () => {
  const intl = useIntl();

  const categories = FeedbackCategory.options.map(id => intl.formatMessage({ id }));

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => {}}
      validationSchema={toFormikValidationSchema(getFormValidationSchema(intl))}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ errors, submitForm }) => {
        const onSubmit = (event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          submitForm();
        };

        return (
          <Form onSubmit={onSubmit}>
            <FormGroupCompact>
              <Autocomplete
                options={categories}
                defaultValue={categories[0]}
                autoComplete
                openOnFocus
                disableClearable
                renderInput={props => (
                  <Field
                    as={TextField}
                    {...props}
                    label={intl.formatMessage({ id: 'support.feedback.category' })}
                    fullWidth
                    required
                  />
                )}
              />
              <Field
                as={FormInput}
                name="title"
                label={intl.formatMessage({ id: 'support.feedback.title' })}
                required
                errorMsg={errors.title}
              />
              <Field
                as={FormInput}
                name="description"
                label={intl.formatMessage({ id: 'support.feedback.description' })}
                multiline
                rows={10}
                errorMsg={errors.description}
              />
            </FormGroupCompact>
            <FormButtons primaryText={intl.formatMessage({ id: 'common.submit' })} />
          </Form>
        );
      }}
    </Formik>
  );
};

export default FeedbackForm;
