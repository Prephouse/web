import React from 'react';
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

import {
  setAllowLiveFeedback,
  setPracticeMedium,
  setPracticeSessionType,
  setPracticeSource,
} from '../../store/practice/actions';
import { RootState } from '../../store/rootReducer';

import { SessionMedium, SessionSource, SessionType } from '../../utils/enums';

import FormButtons from '../common/FormButtons';

interface Props {
  onNext: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

// TODO use Formik form and validate form submission
const PracticeSettings = ({ onNext }: Props) => {
  const sessionType = useSelector((state: RootState) => state.practiceReducer.sessionType);
  const medium = useSelector((state: RootState) => state.practiceReducer.medium);
  const source = useSelector((state: RootState) => state.practiceReducer.source);
  const allowLiveFeedback = useSelector(
    (state: RootState) => state.practiceReducer.allowLiveFeedback
  );
  const dispatch = useDispatch();

  const intl = useIntl();

  const getSessionTypeName = () => {
    if (sessionType === SessionType.INTERVIEW) {
      return intl.formatMessage({ id: 'practice.settings.type.interview2' });
    } else if (sessionType === SessionType.PRESENTATION) {
      return intl.formatMessage({ id: 'practice.settings.type.presentation2' });
    } else {
      return '';
    }
  };

  return (
    <>
      <Box sx={{ padding: theme => theme.spacing(2) }}>
        <FormControl component="fieldset" required>
          <FormLabel component="legend">
            {intl.formatMessage({ id: 'practice.settings.type.title' })}
          </FormLabel>
          <FormHelperText>
            {intl.formatMessage({ id: 'practice.settings.type.helper' })}
          </FormHelperText>
          <RadioGroup
            row
            name="radio-buttons-group-type"
            value={sessionType}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const value = (event.target as HTMLInputElement).value;
              setPracticeSessionType(parseInt(value))(dispatch);
            }}
          >
            <FormControlLabel
              value={SessionType.INTERVIEW}
              control={<Radio />}
              label={intl.formatMessage({ id: 'practice.settings.type.interview' })}
            />
            <FormControlLabel
              value={SessionType.PRESENTATION}
              control={<Radio />}
              label={intl.formatMessage({ id: 'practice.settings.type.presentation' })}
            />
          </RadioGroup>
        </FormControl>
        <Alert variant="outlined" severity="info" sx={{ margin: theme => theme.spacing(1, 0) }}>
          {intl.formatMessage({ id: 'practice.settings.type.interview.description' })}
        </Alert>
      </Box>
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
            name="radio-buttons-group-medium"
            value={medium}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const value = (event.target as HTMLInputElement).value;
              setPracticeMedium(parseInt(value))(dispatch);
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
        </FormControl>
        <Alert variant="outlined" severity="info" sx={{ margin: theme => theme.spacing(1, 0) }}>
          {intl.formatMessage(
            { id: 'practice.settings.medium.videoAudio.description' },
            { sessionTypeName: getSessionTypeName() }
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
              { sessionTypeName: getSessionTypeName() }
            )}
          </FormHelperText>
          <RadioGroup
            row
            name="radio-buttons-group-source"
            value={source}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const value = (event.target as HTMLInputElement).value;
              setPracticeSource(parseInt(value))(dispatch);
            }}
          >
            <FormControlLabel
              value={SessionSource.RECORD}
              control={<Radio />}
              label={intl.formatMessage({ id: 'practice.settings.source.record' })}
            />
            <FormControlLabel
              value={SessionSource.UPLOAD}
              control={<Radio />}
              label={intl.formatMessage({ id: 'practice.settings.source.upload' })}
            />
          </RadioGroup>
        </FormControl>
        <Alert variant="outlined" severity="info" sx={{ margin: theme => theme.spacing(1, 0) }}>
          {intl.formatMessage(
            { id: 'practice.settings.source.record.description' },
            { sessionTypeName: getSessionTypeName() }
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
            name="radio-buttons-group-live"
            value={allowLiveFeedback}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const value = (event.target as HTMLInputElement).value;
              setAllowLiveFeedback(value === 'true')(dispatch);
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
        </FormControl>
        <Alert variant="outlined" severity="info" sx={{ margin: theme => theme.spacing(1, 0) }}>
          You will receive some, but not all, automated feedback from our system as you go. You can
          use that feedback to improve your skills along the way!
        </Alert>
      </Box>
      <FormButtons
        primaryText="Confirm settings"
        onPrimaryClick={onNext}
        secondaryText="Contact us for help"
        secondaryColor="warning"
      />
    </>
  );
};

export default PracticeSettings;
