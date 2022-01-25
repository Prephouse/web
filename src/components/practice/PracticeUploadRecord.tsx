import { useIntl } from 'react-intl';

import FormButtons from 'components/common/FormButtons';
import AudioRecordZone from 'components/practice/media/AudioRecordZone';
import MediaUploadZone from 'components/practice/media/MediaUploadZone';
import VideoRecordZone from 'components/practice/media/VideoRecordZone';

import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';

import { setMediaSource } from 'states/practice/actions';
import { SessionMedium, SessionOrigin } from 'states/practice/enums';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const PracticeUploadRecord = ({ onNext, onBack }: Props) => {
  const sessionType = useAppSelector(state => state.practice.sessionType);
  const medium = useAppSelector(state => state.practice.medium);
  const origin = useAppSelector(state => state.practice.origin);
  const source = useAppSelector(state => state.practice.source);
  const dispatch = useAppDispatch();

  const intl = useIntl();

  const handleSubmission = (src: string) => {
    dispatch(setMediaSource(src));
  };

  const establishZone = () => {
    let zone = null;
    if (origin === SessionOrigin.Record) {
      if (medium === SessionMedium.VideoAudio) {
        zone = <VideoRecordZone onSubmit={handleSubmission} />;
      } else if (medium === SessionMedium.AudioOnly) {
        zone = <AudioRecordZone onSubmit={handleSubmission} />;
      }
    } else if (origin === SessionOrigin.Upload) {
      zone = (
        <MediaUploadZone sessionType={sessionType} medium={medium} onSubmit={handleSubmission} />
      );
    }
    return zone;
  };

  return (
    <>
      {establishZone()}
      <FormButtons
        primaryText={intl.formatMessage({ id: 'practice.practice.submit' })}
        onPrimaryClick={onNext}
        primaryDisabled={!source}
        secondaryText={intl.formatMessage({ id: 'practice.practice.back' })}
        onSecondaryClick={onBack}
      />
    </>
  );
};

export default PracticeUploadRecord;
