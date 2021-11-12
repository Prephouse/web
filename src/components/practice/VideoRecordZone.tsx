import { useEffect, useRef } from 'react';

import PrephouseMediaRecorder from '../common/MediaRecorder';

const VideoPreview = ({ stream }: { stream: MediaStream | null }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  if (!stream) {
    return null;
  }
  return <video ref={videoRef} width={800} height={800} autoPlay controls />;
};

const VideoRecordZone = () => {
  return (
    <PrephouseMediaRecorder
      video
      render={({ startRecording, stopRecording, previewVideoStream }) => (
        <div>
          <button onClick={startRecording}>Start Recording</button>
          <button onClick={stopRecording}>Stop Recording</button>
          <VideoPreview stream={previewVideoStream} />
        </div>
      )}
    />
  );
};

export default VideoRecordZone;
