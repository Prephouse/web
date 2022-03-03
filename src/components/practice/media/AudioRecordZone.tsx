import AWS from 'aws-sdk';
import { useState } from 'react';

import { Box } from '@mui/material';

import AudioPreview from 'components/common/media/AudioPreview';
import PrephouseMediaRecorder from 'components/common/media/MediaRecorder';
import LiveRecordButtons from 'components/practice/media/LiveRecordButtons';

import { useAddUploadQuestionMutation } from 'services/prephouse';

interface Props {
  onSubmit: (src: string) => void;
}

const AudioRecordZone = ({ onSubmit }: Props) => {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [addUploadQuestion] = useAddUploadQuestionMutation({});

  return (
    <PrephouseMediaRecorder
      audio
      onStop={async (blobUrlString, blob) => {
        const value = await addUploadQuestion().unwrap();
        const upload = new AWS.S3.ManagedUpload({
          params: {
            Bucket: process.env.REACT_APP_AWS_AUDIO_BUCKET ?? 'prephouse-audio-tracks',
            Key: `${value.id}.wav`,
            ContentType: 'audio/wav',
            Body: blob,
          },
        });
        const promise = upload.promise();
      }}
      render={({
        status,
        startRecording,
        stopRecording,
        resumeRecording,
        pauseRecording,
        previewAudioStream,
      }) => {
        if (blobUrl) {
          onSubmit(blobUrl);
          return null;
        }

        return (
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
                resumeRecording={resumeRecording}
                pauseRecording={pauseRecording}
              />
              <AudioPreview stream={previewAudioStream} height={296} />
            </Box>
          </Box>
        );
      }}
    />
  );
};

export default AudioRecordZone;
