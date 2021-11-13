import { useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';

import { setMediaSource } from '../../../store/practice/actions';
import { RootState } from '../../../store/rootReducer';

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
  const sessionType = useSelector((state: RootState) => state.practiceReducer.sessionType);
  const medium = useSelector((state: RootState) => state.practiceReducer.medium);
  const origin = useSelector((state: RootState) => state.practiceReducer.origin);
  const dispatch = useDispatch();

  const [readyForSubmission, setReadyForSubmission] = useState(false);

  const intl = useIntl();

  const handleSubmission = (duration: number | null, src: string) => {
    setMediaSource(duration, src)(dispatch);
    setReadyForSubmission(true);
  };

  const establishZone = () => {
    if (origin === SessionOrigin.RECORD) {
      if (medium === SessionMedium.VIDEO_AND_AUDIO) {
        return <VideoRecordZone onSubmit={handleSubmission} />;
      } else if (medium === SessionMedium.AUDIO_ONLY) {
        return <AudioRecordZone onSubmit={handleSubmission} />;
      }
    } else if (origin === SessionOrigin.UPLOAD) {
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
