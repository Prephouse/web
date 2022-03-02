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
import { InterviewType, SessionMedium, SessionOrigin, SessionType } from 'states/practice/enums';

import { parseStrictDecInt } from 'utils/string';
import { toFormikValidationSchema } from 'utils/zodFormikAdapter';

interface Props {
  onBack: () => void;
  onNext: () => void;
}

const PracticeSettings = ({ onBack, onNext }: Props) => {
  const dispatch = useAppDispatch();

  const intl = useIntl();

  const getSessionTypeName = (st: SessionType) => {
    let name = '';
    if (st === SessionType.Interview) {
      name = intl.formatMessage({ id: 'practice.setting.type.interview2' });
    } else if (st === SessionType.Presentation) {
      name = intl.formatMessage({ id: 'practice.setting.type.presentation2' });
    }
    return name;
  };

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
        interviewType: useAppSelector(state => state.practice.interviewType),
      }}
      validationSchema={toFormikValidationSchema(getFormValidationSchema(intl))}
      onSubmit={values => {
        const { medium, origin, interviewType } = values;
        dispatch(setPracticeSettings(medium, origin, interviewType));
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
                  {intl.formatMessage({ id: 'practice.setting.medium.title' })}
                </FormLabel>
                <FormHelperText>
                  {intl.formatMessage({ id: 'practice.setting.medium.helper' })}
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
              <Alert
                id="sessionMediumDescription"
                role="status"
                variant="outlined"
                severity="info"
                sx={{ my: 1 }}
              >
                {intl.formatMessage(
                  { id: 'practice.setting.medium.videoAudio.description' },
                  { session_type_name: getSessionTypeName(SessionType.Interview) }
                )}
              </Alert>
            </Box>
            <Box sx={{ padding: 2 }}>
              <FormControl component="fieldset" required>
                <FormLabel component="legend">
                  {intl.formatMessage({ id: 'practice.setting.source.title' })}
                </FormLabel>
                <FormHelperText>
                  {intl.formatMessage(
                    { id: 'practice.setting.source.helper' },
                    { session_type_name: getSessionTypeName(SessionType.Interview) }
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
                    label={intl.formatMessage({ id: 'practice.setting.source.record' })}
                    aria-describedby="sessionOriginDescription"
                    aria-invalid={errors.origin && touched.origin ? 'true' : 'false'}
                  />
                  <FormControlLabel
                    value={SessionOrigin.Upload}
                    control={<Radio />}
                    label={intl.formatMessage({ id: 'practice.setting.source.upload' })}
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
              <Alert
                id="sessionOriginDescription"
                role="status"
                variant="outlined"
                severity="info"
                sx={{ my: 1 }}
              >
                {intl.formatMessage(
                  { id: 'practice.setting.source.record.description' },
                  { session_type_name: getSessionTypeName(SessionType.Interview) }
                )}
              </Alert>
            </Box>
            <Box sx={{ padding: 2 }}>
              <FormControl component="fieldset" required>
                <FormLabel component="legend">
                  {intl.formatMessage({ id: 'practice.setting.interview.title' })}
                </FormLabel>
                <FormHelperText>
                  {intl.formatMessage({ id: 'practice.setting.interview.title.description' })}
                </FormHelperText>
                <RadioGroup
                  row
                  name="origin"
                  value={values.interviewType}
                  onChange={event => {
                    setFieldValue('origin', parseStrictDecInt(event.currentTarget.value));
                  }}
                >
                  <FormControlLabel
                    value={InterviewType.Session}
                    control={<Radio />}
                    label={intl.formatMessage({ id: 'practice.setting.interview.session' })}
                    aria-describedby="startInterviewPerSession"
                    aria-invalid={errors.interviewType && touched.interviewType ? 'true' : 'false'}
                  />
                  <FormControlLabel
                    value={InterviewType.Question}
                    control={<Radio />}
                    label={intl.formatMessage({ id: 'practice.setting.interview.question' })}
                    aria-describedby="startInterviewPerQuestion"
                    aria-invalid={errors.interviewType && touched.interviewType ? 'true' : 'false'}
                  />
                </RadioGroup>
                {touched.interviewType && errors.interviewType && (
                  <FormErrorMessage msg={errors.interviewType} />
                )}
              </FormControl>
            </Box>
            <FormButtons
              primaryText={intl.formatMessage({ id: 'practice.setting.confirm' })}
              secondaryText={intl.formatMessage({ id: 'practice.setting.restart' })}
              onSecondaryClick={onBack}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default PracticeSettings;
