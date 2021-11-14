import { useIntl } from 'react-intl';

import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Button, ButtonGroup } from '@mui/material';

import { MediaRecordingStatus } from '../../../utils/enums';

interface Props {
  startRecording: () => void;
  pauseRecording: () => void;
  resumeRecording: () => void;
  stopRecording: () => void;
  status: MediaRecordingStatus;
}

const LiveRecordButtons = ({
  startRecording,
  pauseRecording,
  resumeRecording,
  stopRecording,
  status,
}: Props) => {
  const intl = useIntl();

  return (
    <ButtonGroup variant="contained" fullWidth>
      <Button onClick={startRecording} disabled={status === MediaRecordingStatus.RECORDING}>
        {intl.formatMessage(
          { id: 'practice.practice.start' },
          {
            sessionTypeName: intl.formatMessage({
              id: 'practice.settings.type.interview2',
            }),
          }
        )}
      </Button>
      <Button
        color="secondary"
        onClick={stopRecording}
        disabled={status !== MediaRecordingStatus.RECORDING}
      >
        {intl.formatMessage(
          { id: 'practice.practice.end' },
          {
            sessionTypeName: intl.formatMessage({
              id: 'practice.settings.type.interview2',
            }),
          }
        )}
      </Button>
      {status == MediaRecordingStatus.PAUSED ? (
        <Button startIcon={<PlayArrowIcon />} onClick={resumeRecording}>
          {intl.formatMessage({ id: 'common.resume' })}
        </Button>
      ) : (
        <Button color="secondary" startIcon={<PauseIcon />} onClick={pauseRecording}>
          {intl.formatMessage({ id: 'common.pause' })}
        </Button>
      )}
    </ButtonGroup>
  );
};

export default LiveRecordButtons;