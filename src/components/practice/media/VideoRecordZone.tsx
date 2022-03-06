import AWS from 'aws-sdk';
import { useState } from 'react';
import { useIntl } from 'react-intl';

import { Box, Slider, Stack, Typography } from '@mui/material';

import AudioPreview from 'components/common/media/AudioPreview';
import PrephouseMediaRecorder from 'components/common/media/MediaRecorder';
import VideoPreview from 'components/common/media/VideoPreview';
import LiveRecordButtons from 'components/practice/media/LiveRecordButtons';

import { useAddUploadQuestionMutation } from 'services/prephouse';

interface Props {
  onSubmit: (src: string) => void;
}

const VideoRecordZone = ({ onSubmit }: Props) => {
  const [previewWidth, setPreviewWidth] = useState(60);
  const [blobUrl] = useState<string | null>(null);

  const intl = useIntl();

  const handlePreviewWidthChange = (event: Event, newValue: number | number[]) => {
    setPreviewWidth(newValue as number);
  };

  const [addUploadQuestion] = useAddUploadQuestionMutation({});

  return (
    <PrephouseMediaRecorder
      video
      audio
      onStop={async (bUrl, blob) => {
        const value = await addUploadQuestion().unwrap();
        const upload = new AWS.S3.ManagedUpload({
          params: {
            Bucket: process.env.REACT_APP_AWS_VIDEO_BUCKET ?? 'prephouse-video',
            Key: `${value.id}.mp4`,
            ContentType: 'video/mp4',
            Body: blob,
          },
        });
        upload.promise();
      }}
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
          return null;
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
