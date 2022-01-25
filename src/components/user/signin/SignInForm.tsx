import { Field, Form, Formik } from 'formik';
import { FormEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { Typography } from '@mui/material';

import FormButtons from 'components/common/FormButtons';
import FormGroupCompact from 'components/common/FormGroupCompact';
import FormInput from 'components/common/FormInput';
import FormPaper from 'components/common/FormPaper';
import PageContainer from 'components/common/PageContainer';

import { getCredentials } from 'schemas/user/signInFormSchema';

import signinInitialValues from 'values/user/signInFormValues';

const SignInForm = () => {
  const intl = useIntl();

  const signIn = () => {};

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'user.signin.title' })} />
      <PageContainer maxWidth="md">
        <Formik
          initialValues={signinInitialValues}
          onSubmit={signIn}
          validationSchema={toFormikValidationSchema(getCredentials(intl))}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ resetForm, submitForm }) => {
            const onSubmit = (event: FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              submitForm();
            };

            return (
              <FormPaper elevation={4}>
                <Typography component="h2" variant="h4">
                  {intl.formatMessage({ id: 'user.signin.title' })}
                </Typography>
                <Form onSubmit={onSubmit}>
                  <FormGroupCompact>
                    <Field
                      as={FormInput}
                      name="username"
                      autoComplete="username"
                      label={intl.formatMessage({ id: 'user.signup.username' })}
                    />
                    <Field
                      as={FormInput}
                      name="password"
                      type="password"
                      label={intl.formatMessage({ id: 'user.signin.password' })}
                    />
                  </FormGroupCompact>
                  <FormButtons
                    primaryText={intl.formatMessage({ id: 'user.signin.message' })}
                    onSecondaryClick={() => resetForm()}
                  />
                </Form>
              </FormPaper>
            );
          }}
        </Formik>
      </PageContainer>
    </>
  );
};

export default SignInForm;
