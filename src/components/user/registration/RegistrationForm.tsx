import { Field, Form, Formik, FormikErrors } from 'formik';
import { MouseEvent as ReactMouseEvent, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

import { Popover, Typography } from '@mui/material';

import {
  RegistrationFormValidation,
  RegistrationFormValues,
  initialValues,
} from '../../../helpers/userRegistrationHelper';

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
  const handlePsiClose = () => setAnchorElPsi(null);

  const handlePasswordRequirementFailed = (
    errorMsgId: string,
    errors: FormikErrors<RegistrationFormValues>
  ) => {
    let passwordErrorMsg = intl.formatMessage({ id: errorMsgId });
    passwordErrorMsg = passwordErrorMsg.charAt(0).toLowerCase() + passwordErrorMsg.slice(1);
    const passwordErrors = intl.formatMessage(
      { id: 'user.registration.password.error' },
      { password_error_message: passwordErrorMsg }
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
              intl.formatMessage({ id: 'common.form.field.required' }),
              intl.formatMessage({ id: 'user.registration.email.error' }),
              intl.formatMessage({ id: 'user.registration.password.error' }),
              handlePasswordRequirementFailed
            ).validate()
          }
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ values, errors, resetForm, submitForm }) => (
            <FormPaper elevation={4}>
              <Typography component="h2" variant="h4">
                {intl.formatMessage({ id: 'user.registration.title' })}
              </Typography>
              <Form onSubmit={submitForm}>
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
          )}
        </Formik>
      </PageContainer>
    </>
  );
};

export default RegistrationForm;
