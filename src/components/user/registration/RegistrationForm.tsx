import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import { Field, Form, Formik } from 'formik';
import { Popover, Typography } from '@mui/material';
import { initialValues, RegistrationFormValidation } from './registration-form-helper';
import PageContainer from '../../common/PageContainer';
import FormPaper from '../../common/FormPaper';
import FormGroupCompact from '../../common/FormGroupCompact';
import FormInput from '../../common/FormInput';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';
import FormButtons from '../../common/FormButtons';

const RegistrationForm = () => {
  const intl = useIntl();

  const [anchorElPsi, setAnchorElPsi] = useState<HTMLElement | null>(null);
  const openPsi = Boolean(anchorElPsi);
  const psiPopoverId = openPsi ? 'password-strength-popover' : undefined;
  const handlePsiOpen = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (event.currentTarget != null) {
      setAnchorElPsi(event.currentTarget);
    }
  };
  const handlePsiClose = () => setAnchorElPsi(null);

  const handlePasswordRequirementFailed = (errorMsgId: string, errors: any) => {
    let passwordErrorMsg = intl.formatMessage({ id: errorMsgId });
    passwordErrorMsg = passwordErrorMsg.charAt(0).toLowerCase() + passwordErrorMsg.slice(1);
    const passwordErrors = intl.formatMessage(
      { id: 'user.registration.password.error' },
      { passwordErrorMsg }
    );
    return { ...errors, password: passwordErrors };
  };

  const submitRegistration = () => {};

  return (
    <>
      <Helmet>
        <title>{intl.formatMessage({ id: 'user.registration.title' })}</title>
      </Helmet>
      <PageContainer maxWidth="md">
        <Formik
          initialValues={initialValues}
          onSubmit={submitRegistration}
          validate={values =>
            new RegistrationFormValidation(
              values,
              intl.formatMessage({ id: 'general.field.requiredField' }),
              intl.formatMessage({ id: 'user.registration.email.error' }),
              intl.formatMessage({ id: 'user.registration.password.error' }),
              handlePasswordRequirementFailed
            ).validate()
          }
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ values, errors, resetForm, validateForm, submitForm }) => {
            const onClear = (event: any) => {
              event.preventDefault();
              resetForm();
            };

            const onSubmit = (event: any) => {
              event.preventDefault();
              submitForm().then(console.log);
            };

            return (
              <FormPaper elevation={4}>
                <Typography component="h2" variant="h4">
                  {intl.formatMessage({ id: 'user.registration.title' })}
                </Typography>
                <Form onSubmit={onSubmit}>
                  <FormGroupCompact>
                    <Field
                      as={FormInput}
                      name="firstName"
                      label={intl.formatMessage({ id: 'user.registration.firstName' })}
                      errorMsg={errors.firstName}
                      autoFocus
                      aria-required="true"
                    />
                    <Field
                      as={FormInput}
                      name="lastName"
                      label={intl.formatMessage({ id: 'user.registration.lastName' })}
                      errorMsg={errors.lastName}
                      aria-required="true"
                    />
                    <Field
                      as={FormInput}
                      name="email"
                      autoComplete="email"
                      label={intl.formatMessage({ id: 'user.registration.email' })}
                      errorMsg={errors.email}
                      autoFocus
                      aria-required="true"
                    />
                    <Field
                      as={FormInput}
                      name="password"
                      type="password"
                      label={intl.formatMessage({ id: 'user.registration.password' })}
                      errorMsg={errors.password}
                      onMouseDown={handlePsiOpen}
                      onBlur={handlePsiClose}
                      aria-required="true"
                      aria-owns={psiPopoverId}
                      aria-haspopup="true"
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
                      label={intl.formatMessage({ id: 'user.registration.passwordConfirmation' })}
                      errorMsg={errors.passwordConfirmation}
                    />
                  </FormGroupCompact>
                  <FormButtons
                    primaryText={intl.formatMessage({ id: 'user.registration.register' })}
                    secondaryText={intl.formatMessage({ id: 'user.registration.clear' })}
                    onSecondaryClick={onClear}
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

export default RegistrationForm;
