import { useRef } from 'react';
import ReactHlsPlayer from 'react-hls-player';

const Playback = ({ videoUrl }: { videoUrl: string }) => {
  const playerRef = useRef<HTMLVideoElement>(null);
  return (
    <ReactHlsPlayer playerRef={playerRef} src={videoUrl} controls width="100%" height="auto" />
  );
};

export default Playback;
