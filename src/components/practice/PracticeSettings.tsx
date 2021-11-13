import { Form, Formik } from 'formik';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

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

import { setPracticeSettings } from '../../store/practice/actions';
import { RootState } from '../../store/rootReducer';

import { PracticeSettingsFormValidation } from '../../helpers/practice-settings-form-helper';

import { SessionMedium, SessionOrigin, SessionType } from '../../utils/enums';

import FormButtons from '../common/FormButtons';
import FormErrorMessage from '../common/FormErrorMessage';

interface Props {
  onBack: () => void;
  onNext: () => void;
}

const PracticeSettings = ({ onBack, onNext }: Props) => {
  const dispatch = useDispatch();

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

  return (
    <Formik
      initialValues={{
        medium: useSelector((state: RootState) => state.practiceReducer.medium),
        origin: useSelector((state: RootState) => state.practiceReducer.origin),
        allowLiveFeedback: useSelector(
          (state: RootState) => state.practiceReducer.allowLiveFeedback
        ),
      }}
      validate={values =>
        new PracticeSettingsFormValidation(
          values,
          intl.formatMessage({ id: 'common.form.requiredField' })
        ).validate()
      }
      onSubmit={values => {
        const { medium, origin, allowLiveFeedback } = values;
        setPracticeSettings(medium, origin, allowLiveFeedback)(dispatch);
        onNext();
      }}
      validateOnChange={false}
      validateOnBlur={false}
    >
      {({ touched, values, errors, setFieldValue, submitForm }) => {
        const onSubmit = (event: any) => {
          event.preventDefault();
          submitForm().then(console.log);
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
                You will receive some, but not all, automated feedback from our system as you go.
                You can use that feedback to improve your skills along the way!
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
