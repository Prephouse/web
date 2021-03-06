import AWS from 'aws-sdk';
import { useCallback, useState } from 'react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useIntl } from 'react-intl';

import FormButtons from 'components/common/form/FormButtons';
import AudioRecordZone from 'components/practice/media/AudioRecordZone';
import MediaUploadZone from 'components/practice/media/MediaUploadZone';
import VideoRecordZone from 'components/practice/media/VideoRecordZone';

import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';

import { useAddUploadQuestionMutation, useAddUploadSessionMutation } from 'services/prephouse';

import { setQuestionId } from 'states/practice/actions';
import { SessionMedium, SessionOrigin } from 'states/practice/enums';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const PracticeUploadRecord = ({ onNext, onBack }: Props) => {
  const sessionType = useAppSelector(state => state.practice.sessionType);
  const medium = useAppSelector(state => state.practice.medium);
  const origin = useAppSelector(state => state.practice.origin);
  const questionId = useAppSelector(state => state.practice.questionId);
  const dispatch = useAppDispatch();

  const [blob, setBlob] = useState<Blob | null>(null);

  const [addUploadSession] = useAddUploadSessionMutation({});
  const [addUploadQuestion] = useAddUploadQuestionMutation({});

  const intl = useIntl();

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubmission = (b: Blob) => {
    setBlob(b);
  };

  const handleNextStep = useCallback(async () => {
    if (!blob) {
      return;
    }
    const token = await executeRecaptcha?.('submit_practice_session');
    const uploadRecord = await addUploadSession({ category: sessionType, token }).unwrap();
    const value = await addUploadQuestion({ uploadId: uploadRecord.id, questionId }).unwrap();
    dispatch(setQuestionId(null));
    let upload: AWS.S3.ManagedUpload | null = null;
    if (medium === SessionMedium.VideoAudio) {
      upload = new AWS.S3.ManagedUpload({
        params: {
          Bucket: process.env.REACT_APP_AWS_VIDEO_BUCKET ?? 'prephouse-video',
          Key: `${value.id}.mp4`,
          ContentType: 'video/mp4',
          Body: blob,
        },
      });
    } else if (medium === SessionMedium.AudioOnly) {
      upload = new AWS.S3.ManagedUpload({
        params: {
          Bucket: process.env.REACT_APP_AWS_AUDIO_BUCKET ?? 'prephouse-audio-tracks',
          Key: `${value.id}.wav`,
          ContentType: 'audio/wav',
          Body: blob,
        },
      });
    }
    if (upload) {
      upload.promise();
      onNext();
    }
  }, [
    addUploadQuestion,
    addUploadSession,
    executeRecaptcha,
    sessionType,
    blob,
    medium,
    onNext,
    dispatch,
    questionId,
  ]);

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
        onPrimaryClick={handleNextStep}
        primaryDisabled={!blob}
        secondaryText={intl.formatMessage({ id: 'practice.practice.back' })}
        onSecondaryClick={onBack}
      />
    </>
  );
};

export default PracticeUploadRecord;
