import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useIntl } from 'react-intl';

import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Box, Typography } from '@mui/material';

import QuestionPrompter from 'components/common/question/QuestionPrompter';
import PracticePanelPaper from 'components/practice/media/PracticePanelPaper';

import { SessionMedium, SessionType, getSessionTypeId } from 'states/practice/enums';

interface Props {
  sessionType: SessionType;
  medium: SessionMedium;
  onSubmit: (blob: Blob) => void;
}

const MediaUploadZone = ({ sessionType, medium, onSubmit }: Props) => {
  const [file, setFile] = useState<File | null>(null);

  const intl = useIntl();

  const getAcceptedMimes: () => string[] = () => {
    if (medium === SessionMedium.VideoAudio) {
      return ['video/mp4'];
    }

    return ['audio/mp4', 'audio/wav'];
  };

  const onDrop = useCallback(
    acceptedFiles => {
      setFile(acceptedFiles[0]);
      onSubmit(acceptedFiles[0]);
    },
    [onSubmit]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: getAcceptedMimes(),
    noClick: !!file,
    multiple: false,
  });

  const { ref, ...rootProps } = getRootProps();

  const showUploader = () => {
    if (!file) {
      let msg: string;
      if (isDragActive) {
        msg = intl.formatMessage({ id: 'practice.upload.drop' });
      } else if (isDragReject) {
        msg = intl.formatMessage({ id: 'practice.upload.mime.error' });
      } else {
        msg = intl.formatMessage({ id: 'practice.upload.dragDrop' });
      }
      return (
        <Typography component="div" variant="body2">
          {msg}
        </Typography>
      );
    }
    return undefined;
  };

  return (
    <>
      <PracticePanelPaper>
        <QuestionPrompter />
      </PracticePanelPaper>
      <Box
        ref={ref}
        width={1}
        p={3}
        my={3}
        border="0.5px dashed"
        borderRadius="6px"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          cursor: 'pointer',
          minHeight: 300,
          '& > *': {
            alignSelf: 'center',
          },
        }}
        {...rootProps}
      >
        <FileUploadIcon fontSize="large" sx={{ margin: 1 }} />
        <Typography component="div" variant="h6" gutterBottom>
          {intl.formatMessage(
            { id: 'practice.upload' },
            {
              session_type: intl.formatMessage({
                id: getSessionTypeId(sessionType),
              }),
            }
          )}
        </Typography>
        <input {...getInputProps()} />
        {showUploader()}
      </Box>
    </>
  );
};

export default MediaUploadZone;
