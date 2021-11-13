import { useState } from 'react';

import { Box } from '@mui/material';

import PrephouseMediaRecorder from '../../../common/MediaRecorder';
import LiveRecordButtons from '../LiveRecordButtons';
import AudioPreview from './AudioPreview';

interface Props {
  onSubmit: (duration: number | null, src: string) => void;
}

const AudioRecordZone = ({ onSubmit }: Props) => {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  return (
    <PrephouseMediaRecorder
      audio
      onStop={blobUrl => setBlobUrl(blobUrl)}
      render={({
        status,
        duration,
        startRecording,
        stopRecording,
        resumeRecording,
        pauseRecording,
        previewAudioStream,
      }) => {
        if (blobUrl) {
          onSubmit(duration, blobUrl);
          return <> </>;
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
