import { useState } from 'react';

import { Box } from '@mui/material';

import AudioPreview from 'components/common/AudioPreview';
import PrephouseMediaRecorder from 'components/common/MediaRecorder';
import LiveRecordButtons from 'components/practice/media/LiveRecordButtons';

interface Props {
  onSubmit: (src: string) => void;
}

const AudioRecordZone = ({ onSubmit }: Props) => {
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  return (
    <PrephouseMediaRecorder
      audio
      onStop={burl => setBlobUrl(burl)}
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
