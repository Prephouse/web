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
} from '@mui/material';

import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';

import { setPracticeSettings } from '../../store/practice/actions';

import { PracticeSettingsFormValidation } from '../../helpers/practiceSettingsHelper';

import { SessionMedium, SessionOrigin, SessionType } from '../../utils/enums';

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
    if (st === SessionType.INTERVIEW) {
      return intl.formatMessage({ id: 'practice.settings.type.interview2' });
    } else if (st === SessionType.PRESENTATION) {
      return intl.formatMessage({ id: 'practice.settings.type.presentation2' });
    } else {
      return '';
    }
  };

  const getPermissions = (medium: SessionMedium): PermissionRequest => {
    const permissions: PermissionRequest = {
      audioinput: { declineMessage: intl.formatMessage({ id: 'common.permission.audio' }) },
    };
    if (medium === SessionMedium.VIDEO_AND_AUDIO) {
      permissions.videoinput = {
        declineMessage: intl.formatMessage({ id: 'common.permission.video' }),
      };
    }
    return permissions;
  };

  return (
    <Formik
      initialValues={{
        medium: useAppSelector(state => state.practiceReducer.medium),
        origin: useAppSelector(state => state.practiceReducer.origin),
        allowLiveFeedback: useAppSelector(state => state.practiceReducer.allowLiveFeedback),
      }}
      validate={values =>
        new PracticeSettingsFormValidation(
          values,
          intl.formatMessage({ id: 'common.form.field.required' })
        ).validate()
      }
      onSubmit={values => {
        const { medium, origin, allowLiveFeedback } = values;
        setPracticeSettings(medium, origin, allowLiveFeedback)(dispatch);
        onNext();
      }}
    >
      {({ touched, values, errors, setFieldValue, setFieldError, submitForm }) => {
        const onSubmit = () => {
          submitForm().then(console.log);
        };

        const onOriginPermissionDenied = () => {
          setFieldError('origin', intl.formatMessage({ id: 'common.form.field.denied' }));
        };

        return (
          <Form onSubmit={onSubmit}>
            <Box sx={{ padding: theme => theme.spacing(2) }}>
              <FormControl component="fieldset" required>
                <FormLabel component="legend">
                  {intl.formatMessage({ id: 'practice.settings.medium.title' })}
                </FormLabel>
                <FormHelperText>
                  {intl.formatMessage({ id: 'practice.settings.medium.helper' })}
                </FormHelperText>
                <RadioGroup
                  row
                  name="medium"
                  value={values.medium}
                  onChange={event => {
                    setFieldValue('medium', parseInt(event.currentTarget.value));
                  }}
                >
                  <FormControlLabel
                    value={SessionMedium.VIDEO_AND_AUDIO}
                    control={<Radio />}
                    label={intl.formatMessage({ id: 'practice.settings.medium.videoAudio' })}
                  />
                  <FormControlLabel
                    value={SessionMedium.AUDIO_ONLY}
                    control={<Radio />}
                    label={intl.formatMessage({ id: 'practice.settings.medium.audio' })}
                  />
                </RadioGroup>
                {touched.medium && errors.medium && <FormErrorMessage msg={errors.medium} />}
              </FormControl>
              <Alert
                variant="outlined"
                severity="info"
                sx={{ margin: theme => theme.spacing(1, 0) }}
              >
                {intl.formatMessage(
                  { id: 'practice.settings.medium.videoAudio.description' },
                  { sessionTypeName: getSessionTypeName(SessionType.INTERVIEW) }
                )}
              </Alert>
            </Box>
            <Box sx={{ padding: theme => theme.spacing(2) }}>
              <FormControl component="fieldset" required>
                <FormLabel component="legend">
                  {intl.formatMessage({ id: 'practice.settings.source.title' })}
                </FormLabel>
                <FormHelperText>
                  {intl.formatMessage(
                    { id: 'practice.settings.source.helper' },
                    { sessionTypeName: getSessionTypeName(SessionType.INTERVIEW) }
                  )}
                </FormHelperText>
                <RadioGroup
                  row
                  name="origin"
                  value={values.origin}
                  onChange={event => {
                    setFieldValue('origin', parseInt(event.currentTarget.value));
                  }}
                >
                  <FormControlLabel
                    value={SessionOrigin.RECORD}
                    control={<Radio />}
                    label={intl.formatMessage({ id: 'practice.settings.source.record' })}
                  />
                  <FormControlLabel
                    value={SessionOrigin.UPLOAD}
                    control={<Radio />}
                    label={intl.formatMessage({ id: 'practice.settings.source.upload' })}
                  />
                </RadioGroup>
                {touched.origin && errors.origin && <FormErrorMessage msg={errors.origin} />}
              </FormControl>
              {values.origin === SessionOrigin.RECORD && (
                <PermissionManager
                  permissions={getPermissions(values.medium)}
                  onDenied={onOriginPermissionDenied}
                  render={({ permitted }) => {
                    if (!Object.entries(permitted).length) {
                      return (
                        <Alert variant="outlined" severity="error">
                          {intl.formatMessage({ id: 'common.permission.decline' })}
                          {Object.entries(permitted).map(([, v], i) => (
                            <div key={`decline-message-${v.id}-${i}`}>
                              &bull; {v.declineMessage}
                            </div>
                          ))}
                        </Alert>
                      );
                    }
                    return <> </>;
                  }}
                />
              )}
              <Alert
                variant="outlined"
                severity="info"
                sx={{ margin: theme => theme.spacing(1, 0) }}
              >
                {intl.formatMessage(
                  { id: 'practice.settings.source.record.description' },
                  { sessionTypeName: getSessionTypeName(SessionType.INTERVIEW) }
                )}
              </Alert>
            </Box>
            <Box sx={{ padding: theme => theme.spacing(2) }}>
              <FormControl component="fieldset" required>
                <FormLabel component="legend">
                  {intl.formatMessage({ id: 'practice.settings.liveFeedback.title' })}
                </FormLabel>
                <FormHelperText>
                  {intl.formatMessage({ id: 'practice.settings.liveFeedback.helper' })}
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
                  />
                  <FormControlLabel
                    value="false"
                    control={<Radio />}
                    label={intl.formatMessage({ id: 'common.disabled' })}
                  />
                </RadioGroup>
                {touched.allowLiveFeedback && errors.allowLiveFeedback && (
                  <FormErrorMessage msg={errors.allowLiveFeedback} />
                )}
              </FormControl>
              <Alert
                variant="outlined"
                severity="info"
                sx={{ margin: theme => theme.spacing(1, 0) }}
              >
                {intl.formatMessage({ id: 'practice.settings.liveFeedback.description' })}
              </Alert>
            </Box>
            <FormButtons
              primaryText={intl.formatMessage({ id: 'practice.settings.confirm' })}
              secondaryText={intl.formatMessage({ id: 'practice.settings.back' })}
              onSecondaryClick={onBack}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default PracticeSettings;
