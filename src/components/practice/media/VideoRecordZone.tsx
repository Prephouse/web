import { useState } from 'react';
import { useIntl } from 'react-intl';

import { Box, Slider, Stack, Typography } from '@mui/material';

import AudioPreview from 'components/common/AudioPreview';
import PrephouseMediaRecorder from 'components/common/MediaRecorder';
import VideoPreview from 'components/common/VideoPreview';
import LiveRecordButtons from 'components/practice/media/LiveRecordButtons';

interface Props {
  onSubmit: (src: string) => void;
}

const VideoRecordZone = ({ onSubmit }: Props) => {
  const [previewWidth, setPreviewWidth] = useState(60);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  const intl = useIntl();

  const handlePreviewWidthChange = (event: Event, newValue: number | number[]) => {
    setPreviewWidth(newValue as number);
  };

  return (
    <PrephouseMediaRecorder
      video
      audio
      onStop={burl => setBlobUrl(burl)}
      render={({
        status,
        startRecording,
        stopRecording,
        resumeRecording,
        pauseRecording,
        previewVideoStream,
        previewAudioStream,
      }) => {
        if (blobUrl) {
          onSubmit(blobUrl);
          return <> </>;
        }

        return (
          <Box my={3}>
            <Box my={1}>
              <Stack spacing={3} direction="row" alignItems="center">
                <Typography>
                  {intl.formatMessage({ id: 'practice.practice.preview.size' })}
                </Typography>
                <Slider
                  value={previewWidth}
                  min={30}
                  onChange={handlePreviewWidthChange}
                  valueLabelDisplay="auto"
                  valueLabelFormat={x => `${x}%`}
                />
              </Stack>
            </Box>
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
                  resumeRecording={resumeRecording}
                  pauseRecording={pauseRecording}
                />
                <VideoPreview stream={previewVideoStream} />
                <AudioPreview stream={previewAudioStream} />
              </Box>
            </Box>
          </Box>
        );
      }}
    />
  );
};

export default VideoRecordZone;
