import { useEffect, useRef } from 'react';

const VideoPreview = ({ stream }: { stream: MediaStream | null }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  return <video ref={videoRef} autoPlay style={{ width: '100%', transform: 'scaleX(-1)' }} />;
};

export default VideoPreview;
