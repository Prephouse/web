import { useState } from 'react';
import { useIntl } from 'react-intl';

import { Box, Slider, Stack, Typography } from '@mui/material';

import AudioPreview from 'components/common/media/AudioPreview';
import PrephouseMediaRecorder from 'components/common/media/MediaRecorder';
import VideoPreview from 'components/common/media/VideoPreview';
import QuestionPrompter from 'components/common/question/QuestionPrompter';
import LiveRecordButtons from 'components/practice/media/LiveRecordButtons';
import PracticePanelPaper from 'components/practice/media/PracticePanelPaper';

interface Props {
  onSubmit: (blob: Blob) => void;
}

const VideoRecordZone = ({ onSubmit }: Props) => {
  const [previewWidth, setPreviewWidth] = useState(60);

  const intl = useIntl();

  const handlePreviewWidthChange = (event: Event, newValue: number | number[]) => {
    setPreviewWidth(newValue as number);
  };

  return (
    <PrephouseMediaRecorder
      video
      audio
      onStop={blob => {
        onSubmit(blob);
      }}
      render={({
        status,
        startRecording,
        stopRecording,
        previewVideoStream,
        previewAudioStream,
      }) => (
        <Box my={3}>
          <PracticePanelPaper>
            <Stack spacing={3} direction="row" alignItems="center" sx={{ mb: 1 }}>
              <Typography sx={{ whiteSpace: 'nowrap' }}>
                {intl.formatMessage({ id: 'practice.practice.preview.size' })}
              </Typography>
              <Slider
                size="small"
                value={previewWidth}
                min={30}
                onChange={handlePreviewWidthChange}
                valueLabelDisplay="auto"
                valueLabelFormat={x => `${x}%`}
              />
            </Stack>
            <QuestionPrompter />
          </PracticePanelPaper>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Box sx={{ width: `${previewWidth}%` }}>
              <LiveRecordButtons
                status={status}
                startRecording={startRecording}
                stopRecording={stopRecording}
              />
              <VideoPreview stream={previewVideoStream} />
              <AudioPreview stream={previewAudioStream} />
            </Box>
          </Box>
        </Box>
      )}
    />
  );
};

export default VideoRecordZone;
