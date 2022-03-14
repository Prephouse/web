import { Field, Form, Formik } from 'formik';
import { FormEvent, MouseEvent as ReactMouseEvent, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { Divider, Popover, Typography } from '@mui/material';

import IdpAuthButton from 'components/common/IdpAuthButton';
import PageContainer from 'components/common/container/PageContainer';
import FormButtons from 'components/common/form/FormButtons';
import FormGroupCompact from 'components/common/form/FormGroupCompact';
import FormInput from 'components/common/form/FormInput';
import FormPaper from 'components/common/form/FormPaper';
import PasswordStrengthIndicator from 'components/user/signup/PasswordStrengthIndicator';

import { useSnackbar } from 'hooks/useSnackbar';

import { getFormValidationSchema } from 'schemas/user/signUpFormSchema';

import {
  AuthProvider,
  registerWithEmailAndPassword,
  signInWithAuthProvider,
} from 'services/firebase';

import { PRACTICE_PATH } from 'strings/paths';

import { FACEBOOK_BLUE, FACEBOOK_BLUE_HOVER, GOOGLE_GREY_HOVER, GREY_600 } from 'styles/colours';

import { toFormikValidationSchema } from 'utils/zodFormikAdapter';

import initialValues from 'values/user/signUpFormValues';

const SignUp = () => {
  const intl = useIntl();
  const navigate = useNavigate();

  const { setSnackbar } = useSnackbar();

  const [anchorElPsi, setAnchorElPsi] = useState<HTMLElement | null>(null);
  const openPsi = Boolean(anchorElPsi);
  const psiPopoverId = openPsi ? 'password-strength-popover' : undefined;

  const handlePsiOpen = (event: ReactMouseEvent<HTMLElement, MouseEvent>) => {
    if (event.currentTarget != null) {
      setAnchorElPsi(event.currentTarget);
    }
  };

  const handlePsiClose = () => {
    setAnchorElPsi(null);
  };

  const onSignUp = () => {
    navigate(PRACTICE_PATH); // TODO: temporary landing page after signing in
  };

  const onSignUpError = (code?: string) => {
    setSnackbar({
      severity: 'error',
      message: intl.formatMessage({ id: `firebase.${code}`, defaultMessage: code ?? '' }),
    });
  };

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'app.title' })} />
      <PageContainer maxWidth="sm">
        <FormPaper elevation={4}>
          <Typography component="h2" variant="h4">
            {intl.formatMessage({ id: 'user.signup' })}
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={values =>
              registerWithEmailAndPassword(
                values.firstName,
                values.lastName,
                values.email,
                values.password,
                onSignUp,
                onSignUpError
              )
            }
            validationSchema={toFormikValidationSchema(getFormValidationSchema(intl))}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {({ values, errors, touched, resetForm, submitForm }) => {
              const onSubmit = (event: FormEvent<HTMLFormElement>) => {
                event.preventDefault();
                submitForm();
              };

              return (
                <Form onSubmit={onSubmit}>
                  <FormGroupCompact>
                    <Field
                      as={FormInput}
                      name="firstName"
                      label={intl.formatMessage({ id: 'user.signup.firstName' })}
                      errorMsg={errors.firstName}
                      aria-required="true"
                      aria-invalid={errors.firstName && touched.firstName ? 'true' : 'false'}
                    />
                    <Field
                      as={FormInput}
                      name="lastName"
                      label={intl.formatMessage({ id: 'user.signup.lastName' })}
                      errorMsg={errors.lastName}
                      aria-required="true"
                      aria-invalid={errors.lastName && touched.lastName ? 'true' : 'false'}
                    />
                    <Field
                      as={FormInput}
                      name="email"
                      autoComplete="email"
                      label={intl.formatMessage({ id: 'user.signup.email' })}
                      errorMsg={errors.email}
                      aria-required="true"
                      aria-invalid={errors.email && touched.email ? 'true' : 'false'}
                    />
                    <Field
                      as={FormInput}
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      label={intl.formatMessage({ id: 'user.signup.password' })}
                      errorMsg={errors.password}
                      onMouseDown={handlePsiOpen}
                      onBlur={handlePsiClose}
                      aria-required="true"
                      aria-owns={psiPopoverId}
                      aria-haspopup="true"
                      aria-invalid={errors.password && touched.password ? 'true' : 'false'}
                    />
                    <Popover
                      id={psiPopoverId}
                      sx={{ pointerEvents: 'none' }}
                      open={openPsi}
                      anchorEl={anchorElPsi}
                      anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                      transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                      disableAutoFocus
                      disableEnforceFocus
                    >
                      <PasswordStrengthIndicator password={values.password} />
                    </Popover>
                    <Field
                      as={FormInput}
                      name="passwordConfirmation"
                      type="password"
                      autoComplete="new-password"
                      label={intl.formatMessage({ id: 'user.signup.password.confirm' })}
                      errorMsg={errors.passwordConfirmation}
                      aria-required="true"
                      aria-invalid={
                        errors.passwordConfirmation && touched.passwordConfirmation
                          ? 'true'
                          : 'false'
                      }
                    />
                  </FormGroupCompact>
                  <FormButtons
                    primaryText={intl.formatMessage({ id: 'user.signup.register' })}
                    secondaryText={intl.formatMessage({ id: 'user.signup.clear' })}
                    onSecondaryClick={() => resetForm()}
                    direction="column-reverse"
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
            onClick={() => signInWithAuthProvider(AuthProvider.Google, onSignUp, onSignUpError)}
          >
            {intl.formatMessage({ id: 'user.signup.google.message' })}
          </IdpAuthButton>
          <IdpAuthButton
            backgroundColor={FACEBOOK_BLUE}
            backgroundHoverColor={FACEBOOK_BLUE_HOVER}
            startIcon={<img src="/images/idp/facebook.svg" alt="Facebook Logo" draggable="false" />}
            onClick={() => signInWithAuthProvider(AuthProvider.Facebook, onSignUp, onSignUpError)}
          >
            {intl.formatMessage({ id: 'user.signup.facebook.message' })}
          </IdpAuthButton>
        </FormPaper>
      </PageContainer>
    </>
  );
};

export default SignUp;
