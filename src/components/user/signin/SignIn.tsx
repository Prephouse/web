import { Field, Form, Formik } from 'formik';
import { FormEvent } from 'react';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { Divider, Typography } from '@mui/material';

import IdpAuthButton from 'components/common/IdpAuthButton';
import PageContainer from 'components/common/container/PageContainer';
import FormButtons from 'components/common/form/FormButtons';
import FormGroupCompact from 'components/common/form/FormGroupCompact';
import FormInput from 'components/common/form/FormInput';
import FormPaper from 'components/common/form/FormPaper';

import { useSnackbar } from 'hooks/useSnackbar';

import { getCredentials } from 'schemas/user/signInFormSchema';

import { AuthProvider, logInWithEmailAndPassword, signInWithAuthProvider } from 'services/firebase';

import { PRACTICE_PATH } from 'strings/paths';

import { FACEBOOK_BLUE, FACEBOOK_BLUE_HOVER, GOOGLE_GREY_HOVER, GREY_600 } from 'styles/colours';

import { toFormikValidationSchema } from 'utils/zodFormikAdapter';

import signinInitialValues from 'values/user/signInFormValues';

const SignIn = () => {
  const intl = useIntl();
  const navigate = useNavigate();

  const { setSnackbar } = useSnackbar();

  const onSignIn = () => {
    navigate(PRACTICE_PATH); // TODO: temporary landing page after signing in
  };

  const onSignInError = (code?: string) => {
    setSnackbar({
      severity: 'error',
      message: intl.formatMessage({ id: `firebase.${code}`, defaultMessage: code ?? '' }),
    });
  };

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'user.signin.title' })} />
      <PageContainer maxWidth="sm">
        <FormPaper elevation={4}>
          <Typography component="h2" variant="h4">
            {intl.formatMessage({ id: 'user.signin.title' })}
          </Typography>
          <Formik
            initialValues={signinInitialValues}
            onSubmit={values =>
              logInWithEmailAndPassword(values.email, values.password, onSignIn, onSignInError)
            }
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
                <Form onSubmit={onSubmit}>
                  <FormGroupCompact>
                    <Field
                      as={FormInput}
                      name="email"
                      autoComplete="email"
                      label={intl.formatMessage({ id: 'user.signup.email' })}
                    />
                    <Field
                      as={FormInput}
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      label={intl.formatMessage({ id: 'user.signin.password' })}
                    />
                  </FormGroupCompact>
                  <FormButtons
                    primaryText={intl.formatMessage({ id: 'user.signin.message' })}
                    onSecondaryClick={() => resetForm()}
                  />
                </Form>
              );
            }}
          </Formik>
          <Divider
            sx={{
              margin: 1,
            }}
          />
          <IdpAuthButton
            color={GREY_600}
            backgroundColor="white"
            backgroundHoverColor={GOOGLE_GREY_HOVER}
            startIcon={<img src="/images/idp/google.svg" alt="Google Logo" draggable="false" />}
            onClick={() => signInWithAuthProvider(AuthProvider.Google, onSignIn, onSignInError)}
          >
            {intl.formatMessage({ id: 'user.signin.google.message' })}
          </IdpAuthButton>
          <IdpAuthButton
            backgroundColor={FACEBOOK_BLUE}
            backgroundHoverColor={FACEBOOK_BLUE_HOVER}
            startIcon={<img src="/images/idp/facebook.svg" alt="Facebook Logo" draggable="false" />}
            onClick={() => signInWithAuthProvider(AuthProvider.Facebook, onSignIn, onSignInError)}
          >
            {intl.formatMessage({ id: 'user.signin.facebook.message' })}
          </IdpAuthButton>
        </FormPaper>
      </PageContainer>
    </>
  );
};

export default SignIn;
