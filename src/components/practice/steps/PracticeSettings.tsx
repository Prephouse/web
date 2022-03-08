import { Form, Formik } from 'formik';
import { useIntl } from 'react-intl';

import {
  Alert,
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';

import PermissionManager, { PermissionRequestMap } from 'components/common/PermissionManager';
import FormButtons from 'components/common/form/FormButtons';
import FormErrorMessage from 'components/common/form/FormErrorMessage';

import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';

import { getFormValidationSchema } from 'schemas/practice/practiceFormSchema';

import { setPracticeSettings } from 'states/practice/actions';
import { SessionMedium, SessionOrigin, SessionType, getSessionTypeId } from 'states/practice/enums';

import { parseStrictDecInt } from 'utils/string';
import { toFormikValidationSchema } from 'utils/zodFormikAdapter';

interface Props {
  onBack: () => void;
  onNext: () => void;
}

const PracticeSettings = ({ onBack, onNext }: Props) => {
  const dispatch = useAppDispatch();

  const intl = useIntl();

  const getPermissions = (medium: SessionMedium): PermissionRequestMap => {
    const permissions: PermissionRequestMap = new Map([
      [
        'audioinput',
        {
          declineMessage: intl.formatMessage({ id: 'common.permission.audio' }),
        },
      ],
    ]);
    if (medium === SessionMedium.VideoAudio) {
      permissions.set('videoinput', {
        declineMessage: intl.formatMessage({ id: 'common.permission.video' }),
      });
    }
    return permissions;
  };

  return (
    <Formik
      initialValues={{
        medium: useAppSelector(state => state.practice.medium),
        origin: useAppSelector(state => state.practice.origin),
        sessionType: useAppSelector(state => state.practice.sessionType),
      }}
      validationSchema={toFormikValidationSchema(getFormValidationSchema(intl))}
      onSubmit={values => {
        const { medium, origin, sessionType } = values;
        dispatch(setPracticeSettings(medium, origin, sessionType));
        onNext();
      }}
    >
      {({ touched, values, errors, setFieldValue, setFieldError, submitForm }) => {
        const onOriginPermissionDenied = () => {
          setFieldError('origin', intl.formatMessage({ id: 'common.permission.denied' }));
        };

        return (
          <Form onSubmit={submitForm}>
            <Box sx={{ padding: 2 }}>
              <FormControl component="fieldset" required>
                <FormLabel component="legend">
                  {intl.formatMessage({ id: 'practice.setting.type.title' })}
                </FormLabel>
                <FormHelperText>
                  {intl.formatMessage({ id: 'practice.setting.type.helper' })}
                </FormHelperText>
                <RadioGroup
                  row
                  name="sessionType"
                  value={values.sessionType}
                  onChange={event => {
                    setFieldValue('sessionType', parseStrictDecInt(event.currentTarget.value));
                  }}
                >
                  <FormControlLabel
                    value={SessionType.Interview}
                    control={<Radio />}
                    label={intl.formatMessage({ id: 'practice.setting.type.interview' })}
                    aria-describedby="sessionTypeDescription"
                    aria-invalid={errors.sessionType && touched.sessionType ? 'true' : 'false'}
                  />
                  <FormControlLabel
                    value={SessionType.Presentation}
                    control={<Radio />}
                    label={intl.formatMessage({ id: 'practice.setting.type.presentation' })}
                    aria-describedby="sessionTypeDescription"
                    aria-invalid={errors.sessionType && touched.sessionType ? 'true' : 'false'}
                  />
                </RadioGroup>
                {touched.sessionType && errors.sessionType && (
                  <FormErrorMessage msg={errors.sessionType} />
                )}
              </FormControl>
            </Box>
            <Box sx={{ padding: 2 }}>
              <FormControl component="fieldset" required>
                <FormLabel component="legend">
                  {intl.formatMessage({ id: 'practice.setting.source.title' })}
                </FormLabel>
                <FormHelperText>
                  {intl.formatMessage(
                    { id: 'practice.setting.source.helper' },
                    {
                      session_type: intl.formatMessage({
                        id: getSessionTypeId(values.sessionType),
                      }),
                    }
                  )}
                </FormHelperText>
                <RadioGroup
                  row
                  name="origin"
                  value={values.origin}
                  onChange={event => {
                    setFieldValue('origin', parseStrictDecInt(event.currentTarget.value));
                  }}
                >
                  <FormControlLabel
                    value={SessionOrigin.Record}
                    control={<Radio />}
                    label={intl.formatMessage(
                      { id: 'practice.setting.source.record' },
                      {
                        session_type: intl.formatMessage({
                          id: getSessionTypeId(values.sessionType),
                        }),
                      }
                    )}
                    aria-describedby="sessionOriginDescription"
                    aria-invalid={errors.origin && touched.origin ? 'true' : 'false'}
                  />
                  <FormControlLabel
                    value={SessionOrigin.Upload}
                    control={<Radio />}
                    label={intl.formatMessage(
                      { id: 'practice.setting.source.upload' },
                      {
                        session_type: intl.formatMessage({
                          id: getSessionTypeId(values.sessionType),
                        }),
                      }
                    )}
                    aria-describedby="sessionOriginDescription"
                    aria-invalid={errors.origin && touched.origin ? 'true' : 'false'}
                  />
                </RadioGroup>
                {touched.origin && errors.origin && <FormErrorMessage msg={errors.origin} />}
              </FormControl>
              {values.origin === SessionOrigin.Record && (
                <PermissionManager
                  requests={getPermissions(values.medium)}
                  onDenied={onOriginPermissionDenied}
                  render={({ permissions }) => {
                    if (permissions.size > 0) {
                      return (
                        <Alert variant="outlined" severity="error">
                          {intl.formatMessage({ id: 'common.permission.decline' })}
                          <Typography component="ul" variant="inherit">
                            {[...permissions.values()]
                              .filter(v => !v.label)
                              .map(v => (
                                <li key={`decline-message-${v.id}`}>{v.declineMessage}</li>
                              ))}
                          </Typography>
                        </Alert>
                      );
                    }
                    return null;
                  }}
                />
              )}
            </Box>
            <Box sx={{ padding: 2 }}>
              <FormControl component="fieldset" required>
                <FormLabel component="legend">
                  {intl.formatMessage({ id: 'practice.setting.medium.title' })}
                </FormLabel>
                <FormHelperText>
                  {intl.formatMessage(
                    { id: 'practice.setting.medium.helper' },
                    {
                      session_type: intl.formatMessage({
                        id: getSessionTypeId(values.sessionType),
                      }),
                    }
                  )}
                </FormHelperText>
                <RadioGroup
                  row
                  name="medium"
                  value={values.medium}
                  onChange={event => {
                    setFieldValue('medium', parseStrictDecInt(event.currentTarget.value));
                  }}
                >
                  <FormControlLabel
                    value={SessionMedium.VideoAudio}
                    control={<Radio />}
                    label={intl.formatMessage({ id: 'practice.setting.medium.videoAudio' })}
                    aria-describedby="sessionMediumDescription"
                    aria-invalid={errors.medium && touched.medium ? 'true' : 'false'}
                  />
                  <FormControlLabel
                    value={SessionMedium.AudioOnly}
                    control={<Radio />}
                    label={intl.formatMessage({ id: 'practice.setting.medium.audio' })}
                    aria-describedby="sessionMediumDescription"
                    aria-invalid={errors.medium && touched.medium ? 'true' : 'false'}
                  />
                </RadioGroup>
                {touched.medium && errors.medium && <FormErrorMessage msg={errors.medium} />}
              </FormControl>
            </Box>
            <FormButtons
              primaryText={intl.formatMessage({ id: 'practice.setting.confirm' })}
              secondaryText={intl.formatMessage({ id: 'practice.setting.back' })}
              onSecondaryClick={onBack}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default PracticeSettings;
