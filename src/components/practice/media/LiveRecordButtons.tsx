import { useIntl } from 'react-intl';

import { Button, ButtonGroup } from '@mui/material';

import { MediaRecordingStatus } from 'components/common/media/MediaRecorder';

interface Props {
  startRecording: () => void;
  stopRecording: () => void;
  status: MediaRecordingStatus;
}

const LiveRecordButtons = ({ startRecording, stopRecording, status }: Props) => {
  const intl = useIntl();

  return (
    <ButtonGroup variant="contained" fullWidth>
      <Button onClick={startRecording} disabled={status === MediaRecordingStatus.Recording}>
        {intl.formatMessage(
          { id: 'practice.practice.start' },
          {
            session_type: intl.formatMessage({
              id: 'practice.setting.type.interview2',
            }),
          }
        )}
      </Button>
      <Button
        color="secondary"
        onClick={stopRecording}
        disabled={status !== MediaRecordingStatus.Recording}
      >
        {intl.formatMessage(
          { id: 'practice.practice.end' },
          {
            session_type: intl.formatMessage({
              id: 'practice.setting.type.interview2',
            }),
          }
        )}
      </Button>
    </ButtonGroup>
  );
};

export default LiveRecordButtons;
