import { useIntl } from 'react-intl';

import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';

import { setMediaSource } from '../../store/practice/actions';
import { SessionMedium, SessionOrigin } from '../../store/practice/types';

import FormButtons from '../common/FormButtons';
import AudioRecordZone from './media/AudioRecordZone';
import MediaUploadZone from './media/MediaUploadZone';
import VideoRecordZone from './media/VideoRecordZone';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const PracticeUploadRecord = ({ onNext, onBack }: Props) => {
  const sessionType = useAppSelector(state => state.practiceReducer.sessionType);
  const medium = useAppSelector(state => state.practiceReducer.medium);
  const origin = useAppSelector(state => state.practiceReducer.origin);
  const source = useAppSelector(state => state.practiceReducer.source);
  const dispatch = useAppDispatch();

  const intl = useIntl();

  const handleSubmission = (src: string) => {
    setMediaSource(src)(dispatch);
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
