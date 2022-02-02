import { Field, Form, Formik } from 'formik';
import { FormEvent, MouseEvent as ReactMouseEvent, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';
import { toFormikValidationSchema } from 'zod-formik-adapter';

import { Popover, Typography } from '@mui/material';

import PageContainer from 'components/common/container/PageContainer';
import FormButtons from 'components/common/form/FormButtons';
import FormGroupCompact from 'components/common/form/FormGroupCompact';
import FormInput from 'components/common/form/FormInput';
import FormPaper from 'components/common/form/FormPaper';
import PasswordStrengthIndicator from 'components/user/signup/PasswordStrengthIndicator';

import { getFormValidationSchema } from 'schemas/user/signUpFormSchema';

import { useSignUpUserMutation } from 'services/prephouse';

import initialValues from 'values/user/signUpFormValues';

const SignUp = () => {
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

  const [registerUser] = useSignUpUserMutation();

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'user.signup.title' })} />
      <PageContainer maxWidth="md">
        <Formik
          initialValues={initialValues}
          onSubmit={values =>
            registerUser({
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              password: values.password,
            })
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
              <FormPaper elevation={4}>
                <Typography component="h2" variant="h4">
                  {intl.formatMessage({ id: 'user.signup.title' })}
                </Typography>
                <Form onSubmit={onSubmit}>
                  <FormGroupCompact>
                    <Field
                      as={FormInput}
                      name="firstName"
                      label={intl.formatMessage({ id: 'user.signup.firstName' })}
                      errorMsg={errors.firstName}
                      required
                      aria-invalid={errors.firstName && touched.firstName ? 'true' : 'false'}
                    />
                    <Field
                      as={FormInput}
                      name="lastName"
                      label={intl.formatMessage({ id: 'user.signup.lastName' })}
                      errorMsg={errors.lastName}
                      required
                      aria-invalid={errors.lastName && touched.lastName ? 'true' : 'false'}
                    />
                    <Field
                      as={FormInput}
                      name="email"
                      autoComplete="email"
                      label={intl.formatMessage({ id: 'user.signup.email' })}
                      errorMsg={errors.email}
                      required
                      aria-invalid={errors.email && touched.email ? 'true' : 'false'}
                    />
                    <Field
                      as={FormInput}
                      name="password"
                      type="password"
                      label={intl.formatMessage({ id: 'user.signup.password' })}
                      errorMsg={errors.password}
                      onMouseDown={handlePsiOpen}
                      onBlur={handlePsiClose}
                      required
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
                      label={intl.formatMessage({ id: 'user.signup.password.confirm' })}
                      errorMsg={errors.passwordConfirmation}
                      required
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

export default SignUp;
