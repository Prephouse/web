import { Form, Formik } from 'formik';
import { useIntl } from 'react-intl';
import { toFormikValidationSchema } from 'zod-formik-adapter';

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

import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';

import { getFormValidationSchema } from '../../schemas/practice/practiceFormSchema';

import { parseStrictDecInt } from '../../utils/string';

import { setPracticeSettings } from '../../states/practice/actions';
import { SessionMedium, SessionOrigin, SessionType } from '../../states/practice/enums';
import FormButtons from '../common/FormButtons';
import FormErrorMessage from '../common/FormErrorMessage';
import PermissionManager, { PermissionRequest } from '../common/PermissionManager';

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

  const getPermissions = (medium: SessionMedium): PermissionRequest => {
    const permissions: PermissionRequest = new Map([
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
        allowLiveFeedback: useAppSelector(state => state.practice.allowLiveFeedback),
      }}
      validationSchema={toFormikValidationSchema(getFormValidationSchema(intl))}
      onSubmit={values => {
        const { medium, origin, allowLiveFeedback } = values;
        dispatch(setPracticeSettings(medium, origin, allowLiveFeedback));
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
                sx={{ margin: theme => theme.spacing(1, 0) }}
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
                    return <> </>;
                  }}
                />
              )}
              <Alert
                id="sessionOriginDescription"
                role="status"
                variant="outlined"
                severity="info"
                sx={{ margin: theme => theme.spacing(1, 0) }}
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
                  {intl.formatMessage({ id: 'practice.setting.liveFeedback.title' })}
                </FormLabel>
                <FormHelperText>
                  {intl.formatMessage({ id: 'practice.setting.liveFeedback.helper' })}
                </FormHelperText>
                <RadioGroup
                  row
                  name="allowLiveFeedback"
                  value={values.allowLiveFeedback}
                  onChange={event => {
                    setFieldValue('allowLiveFeedback', event.currentTarget.value === 'true');
                  }}
                >
                  <FormControlLabel
                    value="true"
                    control={<Radio />}
                    label={intl.formatMessage({ id: 'common.enabled' })}
                    aria-describedby="allowLiveFeedbackRadioDescription"
                    aria-invalid={
                      errors.allowLiveFeedback && touched.allowLiveFeedback ? 'true' : 'false'
                    }
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label={intl.formatMessage({ id: 'common.disabled' })}
                    aria-describedby="allowLiveFeedbackRadioDescription"
                    aria-invalid={
                      errors.allowLiveFeedback && touched.allowLiveFeedback ? 'true' : 'false'
                    }
                  />
                </RadioGroup>
                {touched.allowLiveFeedback && errors.allowLiveFeedback && (
                  <FormErrorMessage msg={errors.allowLiveFeedback} />
                )}
              </FormControl>
              <Alert
                id="allowLiveFeedbackRadioDescription"
                role="status"
                variant="outlined"
                severity="info"
                sx={{ margin: theme => theme.spacing(1, 0) }}
              >
                {intl.formatMessage({ id: 'practice.setting.liveFeedback.description' })}
              </Alert>
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
