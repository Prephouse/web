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
} from '@mui/material';

import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';

import { getFormValidationSchema } from '../../schemas/practice/practiceFormSchema';

import { setPracticeSettings } from '../../store/practice/actions';

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
    let name = '';
    if (st === SessionType.Interview) {
      name = intl.formatMessage({ id: 'practice.settings.type.interview2' });
    } else if (st === SessionType.Presentation) {
      name = intl.formatMessage({ id: 'practice.settings.type.presentation2' });
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
        medium: useAppSelector(state => state.practiceReducer.medium),
        origin: useAppSelector(state => state.practiceReducer.origin),
        allowLiveFeedback: useAppSelector(state => state.practiceReducer.allowLiveFeedback),
      }}
      validationSchema={toFormikValidationSchema(getFormValidationSchema(intl))}
      onSubmit={values => {
        const { medium, origin, allowLiveFeedback } = values;
        setPracticeSettings(medium, origin, allowLiveFeedback)(dispatch);
        onNext();
      }}
    >
      {({ touched, values, errors, setFieldValue, setFieldError, submitForm }) => {
        const onOriginPermissionDenied = () => {
          setFieldError('origin', intl.formatMessage({ id: 'common.form.field.denied' }));
        };

        return (
          <Form onSubmit={submitForm}>
            <Box sx={{ padding: 2 }}>
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
                    setFieldValue('medium', parseInt(event.currentTarget.value, 10));
                  }}
                >
                  <FormControlLabel
                    value={SessionMedium.VideoAudio}
                    control={<Radio />}
                    label={intl.formatMessage({ id: 'practice.settings.medium.videoAudio' })}
                  />
                  <FormControlLabel
                    value={SessionMedium.AudioOnly}
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
                  { session_type_name: getSessionTypeName(SessionType.Interview) }
                )}
              </Alert>
            </Box>
            <Box sx={{ padding: 2 }}>
              <FormControl component="fieldset" required>
                <FormLabel component="legend">
                  {intl.formatMessage({ id: 'practice.settings.source.title' })}
                </FormLabel>
                <FormHelperText>
                  {intl.formatMessage(
                    { id: 'practice.settings.source.helper' },
                    { session_type_name: getSessionTypeName(SessionType.Interview) }
                  )}
                </FormHelperText>
                <RadioGroup
                  row
                  name="origin"
                  value={values.origin}
                  onChange={event => {
                    setFieldValue('origin', parseInt(event.currentTarget.value, 10));
                  }}
                >
                  <FormControlLabel
                    value={SessionOrigin.Record}
                    control={<Radio />}
                    label={intl.formatMessage({ id: 'practice.settings.source.record' })}
                  />
                  <FormControlLabel
                    value={SessionOrigin.Upload}
                    control={<Radio />}
                    label={intl.formatMessage({ id: 'practice.settings.source.upload' })}
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
                          {[...permissions.values()]
                            .filter(v => !v.label)
                            .map(v => (
                              <div key={`decline-message-${v.id}`}>&bull; {v.declineMessage}</div>
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
                  { session_type_name: getSessionTypeName(SessionType.Interview) }
                )}
              </Alert>
            </Box>
            <Box sx={{ padding: 2 }}>
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
              secondaryText={intl.formatMessage({ id: 'practice.settings.restart' })}
              onSecondaryClick={onBack}
            />
          </Form>
        );
      }}
    </Formik>
  );
};

export default PracticeSettings;
