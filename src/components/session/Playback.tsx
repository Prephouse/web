import VideoPreview from 'components/common/media/VideoPreview';

const Playback = ({ videoUrl }: { videoUrl: string | undefined }) => (
  <VideoPreview source={videoUrl} />
);

export default Playback;
