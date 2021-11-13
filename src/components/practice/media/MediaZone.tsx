import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { RootState } from '../../../store/rootReducer';

import { SessionMedium, SessionOrigin } from '../../../utils/enums';

import FormButtons from '../../common/FormButtons';
import MediaUploadZone from './MediaUploadZone';
import VideoRecordZone from './video/VideoRecordZone';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const MediaZone = ({ onNext, onBack }: Props) => {
  const sessionType = useSelector((state: RootState) => state.practiceReducer.sessionType);
  const medium = useSelector((state: RootState) => state.practiceReducer.medium);
  const origin = useSelector((state: RootState) => state.practiceReducer.origin);

  const intl = useIntl();

  const establishZone = () => {
    if (origin === SessionOrigin.RECORD) {
      if (medium === SessionMedium.VIDEO_AND_AUDIO) {
        return <VideoRecordZone />;
      }
    } else if (origin === SessionOrigin.UPLOAD) {
      return <MediaUploadZone sessionType={sessionType} medium={medium} />;
    }
  };

  return (
    <>
      {establishZone()}
      <FormButtons
        primaryText={intl.formatMessage({ id: 'practice.practice.submit' })}
        onPrimaryClick={onNext}
        secondaryText={intl.formatMessage({ id: 'practice.practice.back' })}
        onSecondaryClick={onBack}
      />
    </>
  );
};

export default MediaZone;
