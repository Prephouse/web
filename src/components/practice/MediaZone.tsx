import React from 'react';
import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';

import { RootState } from '../../store/rootReducer';

import { SessionMedium, SessionSource } from '../../utils/enums';

import FormButtons from '../common/FormButtons';
import MediaUploadZone from './MediaUploadZone';
import VideoRecordZone from './VideoRecordZone';

interface Props {
  onBack: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const MediaZone = ({ onBack }: Props) => {
  const sessionType = useSelector((state: RootState) => state.practiceReducer.sessionType);
  const medium = useSelector((state: RootState) => state.practiceReducer.medium);
  const source = useSelector((state: RootState) => state.practiceReducer.source);

  const intl = useIntl();

  const establishZone = () => {
    if (source === SessionSource.RECORD) {
      if (medium === SessionMedium.VIDEO_AND_AUDIO) {
        return <VideoRecordZone />;
      }
    } else if (source === SessionSource.UPLOAD) {
      return <MediaUploadZone sessionType={sessionType} medium={medium} />;
    }
  };

  return (
    <>
      {establishZone()}
      <FormButtons
        primaryText={intl.formatMessage({ id: 'practice.practice.submit' })}
        secondaryText={intl.formatMessage({ id: 'practice.practice.back' })}
        onSecondaryClick={onBack}
      />
    </>
  );
};

export default MediaZone;
