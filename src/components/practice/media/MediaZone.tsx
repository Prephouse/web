import { useState } from 'react';
import { useIntl } from 'react-intl';

import useAppDispatch from '../../../hooks/useAppDispatch';
import useAppSelector from '../../../hooks/useAppSelector';

import { setMediaSource } from '../../../store/practice/actions';

import { SessionMedium, SessionOrigin } from '../../../utils/enums';

import FormButtons from '../../common/FormButtons';
import MediaUploadZone from './MediaUploadZone';
import AudioRecordZone from './audio/AudioRecordZone';
import VideoRecordZone from './video/VideoRecordZone';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const MediaZone = ({ onNext, onBack }: Props) => {
  const sessionType = useAppSelector(state => state.practiceReducer.sessionType);
  const medium = useAppSelector(state => state.practiceReducer.medium);
  const origin = useAppSelector(state => state.practiceReducer.origin);
  const dispatch = useAppDispatch();

  const [readyForSubmission, setReadyForSubmission] = useState(false);

  const intl = useIntl();

  const handleSubmission = (duration: number | null, src: string) => {
    setMediaSource(duration, src)(dispatch);
    setReadyForSubmission(true);
  };

  const establishZone = () => {
    if (origin === SessionOrigin.Record) {
      if (medium === SessionMedium.VideoAudio) {
        return <VideoRecordZone onSubmit={handleSubmission} />;
      } else if (medium === SessionMedium.AudioOnly) {
        return <AudioRecordZone onSubmit={handleSubmission} />;
      }
    } else if (origin === SessionOrigin.Upload) {
      return (
        <MediaUploadZone sessionType={sessionType} medium={medium} onSubmit={handleSubmission} />
      );
    }
  };

  return (
    <>
      {establishZone()}
      <FormButtons
        primaryText={intl.formatMessage({ id: 'practice.practice.submit' })}
        onPrimaryClick={onNext}
        primaryDisabled={!readyForSubmission}
        secondaryText={intl.formatMessage({ id: 'practice.practice.back' })}
        onSecondaryClick={onBack}
      />
    </>
  );
};

export default MediaZone;
