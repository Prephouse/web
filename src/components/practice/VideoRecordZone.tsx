import { useState } from 'react';

import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Box, Button, ButtonGroup, Slider, Stack, Typography } from '@mui/material';

import { MediaRecordingStatus } from '../../utils/enums';

import PrephouseMediaRecorder from '../common/MediaRecorder';
import AudioPreview from './AudioPreview';
import VideoPlaybackView from './VideoPlaybackView';
import VideoPreview from './VideoPreview';

const VideoRecordZone = () => {
  const [previewWidth, setPreviewWidth] = useState(60);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  const handlePreviewWidthChange = (event: Event, newValue: number | number[]) => {
    setPreviewWidth(newValue as number);
  };
  return (
    <PrephouseMediaRecorder
      video
      audio
      onStop={blobUrl => setBlobUrl(blobUrl)}
      render={({
        status,
        duration,
        startRecording,
        stopRecording,
        resumeRecording,
        pauseRecording,
        previewVideoStream,
        previewAudioStream,
      }) => {
        if (blobUrl) {
          return <VideoPlaybackView duration={duration} src={blobUrl} />;
        }
        return (
          <Box my={3}>
            <Box my={1}>
              <Stack spacing={3} direction="row" alignItems="center">
                <Typography>Preview Size</Typography>
                <Slider
                  value={previewWidth}
                  min={30}
                  onChange={handlePreviewWidthChange}
                  valueLabelDisplay="auto"
                  valueLabelFormat={x => x + '%'}
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
                <ButtonGroup variant="contained" fullWidth>
                  {status !== MediaRecordingStatus.RECORDING ? (
                    <Button onClick={startRecording}>Start Interview</Button>
                  ) : (
                    <Button color="secondary" onClick={stopRecording}>
                      Stop Interview
                    </Button>
                  )}
                  {status == MediaRecordingStatus.PAUSED ? (
                    <Button startIcon={<PlayArrowIcon />} onClick={resumeRecording}>
                      Resume
                    </Button>
                  ) : (
                    <Button color="secondary" startIcon={<PauseIcon />} onClick={pauseRecording}>
                      Pause
                    </Button>
                  )}
                </ButtonGroup>
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
