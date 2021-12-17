import { Field, Form, Formik } from 'formik';
import { FormEvent, MouseEvent as ReactMouseEvent, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { Popover, Typography } from '@mui/material';

import { getFormValidationSchema } from '../../../schemas/user/registrationFormSchema';

import { initialValues } from '../../../values/user/registrationFormValues';

import FormButtons from '../../common/FormButtons';
import FormGroupCompact from '../../common/FormGroupCompact';
import FormInput from '../../common/FormInput';
import FormPaper from '../../common/FormPaper';
import PageContainer from '../../common/PageContainer';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';

const RegistrationForm = () => {
  const intl = useIntl();

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
          validationSchema={toFormikValidationSchema(getFormValidationSchema(intl))}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ values, errors, resetForm, submitForm }) => {
            const onSubmit = (event: FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              submitForm();
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
                      label={intl.formatMessage({ id: 'user.registration.password.confirm' })}
                      errorMsg={errors.passwordConfirmation}
                    />
                  </FormGroupCompact>
                  <FormButtons
                    primaryText={intl.formatMessage({ id: 'user.registration.register' })}
                    secondaryText={intl.formatMessage({ id: 'user.registration.clear' })}
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

export default RegistrationForm;
