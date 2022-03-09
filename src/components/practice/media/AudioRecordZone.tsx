import { Box } from '@mui/material';

import AudioPreview from 'components/common/media/AudioPreview';
import PrephouseMediaRecorder from 'components/common/media/MediaRecorder';
import QuestionPrompter from 'components/common/question/QuestionPrompter';
import LiveRecordButtons from 'components/practice/media/LiveRecordButtons';
import PracticePanelPaper from 'components/practice/media/PracticePanelPaper';

interface Props {
  onSubmit: (blob: Blob) => void;
}

const AudioRecordZone = ({ onSubmit }: Props) => (
  <PrephouseMediaRecorder
    audio
    onStop={(bUrl, blob) => {
      onSubmit(blob);
    }}
    render={({ status, startRecording, stopRecording, previewAudioStream }) => (
      <>
        <PracticePanelPaper>
          <QuestionPrompter />
        </PracticePanelPaper>
        <Box
          my={3}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Box sx={{ width: '100%' }}>
            <LiveRecordButtons
              status={status}
              startRecording={startRecording}
              stopRecording={stopRecording}
            />
            <AudioPreview stream={previewAudioStream} height={296} />
          </Box>
        </Box>
      </>
    )}
  />
);

export default AudioRecordZone;
