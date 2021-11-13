import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';

import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Box, Button, ButtonGroup, Slider, Stack, Typography } from '@mui/material';

import { setMediaSource } from '../../../../store/practice/actions';

import { MediaRecordingStatus } from '../../../../utils/enums';

import PrephouseMediaRecorder from '../../../common/MediaRecorder';
import AudioPreview from '../audio/AudioPreview';
import VideoPreview from './VideoPreview';

const VideoRecordZone = () => {
  const dispatch = useDispatch();

  const intl = useIntl();

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
          setMediaSource(duration, blobUrl)(dispatch);
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
                  <Button
                    onClick={startRecording}
                    disabled={status === MediaRecordingStatus.RECORDING}
                  >
                    {intl.formatMessage({ id: 'common.recording.start' })}
                  </Button>
                  <Button
                    color="secondary"
                    onClick={stopRecording}
                    disabled={status !== MediaRecordingStatus.RECORDING}
                  >
                    {intl.formatMessage({ id: 'common.recording.stop' })}
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
