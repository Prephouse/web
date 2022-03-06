import { useEffect, useRef } from 'react';

const VideoPreview = ({
  stream,
  source,
}: {
  stream?: MediaStream | null;
  source?: string | undefined;
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const props = source
    ? { src: source, controls: true, style: { width: '100%' } }
    : { autoPlay: true, ref: videoRef, style: { width: '100%', transform: 'scaleX(-1)' } };

  // eslint-disable-next-line jsx-a11y/media-has-caption
  return <video {...props} />;
};

export default VideoPreview;
