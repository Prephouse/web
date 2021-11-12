import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useIntl } from 'react-intl';

import { Box, Typography } from '@mui/material';

import { SessionMedium, SessionType } from '../../utils/enums';

interface Props {
  sessionType: SessionType;
  medium: SessionMedium;
}

const MediaUploadZone = ({ sessionType, medium }: Props) => {
  const intl = useIntl();

  const [file, setFile] = useState<File | null>(null);

  const getAcceptedMimes: () => string[] = () => {
    console.log(sessionType);
    if (medium === SessionMedium.VIDEO_AND_AUDIO) {
      return ['video/mp4'];
    } else {
      return ['audio/mp4', 'audio/wav'];
    }
  };
  const onDrop = useCallback(acceptedFiles => {
    setFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: getAcceptedMimes(),
    noClick: !!file,
    multiple: false,
  });
  const { ref, ...rootProps } = getRootProps();

  const showUploader = (isDragActive = false, isDragReject = false) => {
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
  };

  return (
    <Box
      ref={ref}
      width={1}
      p={3}
      my={3}
      border="0.5px dashed"
      borderRadius={6}
      sx={{ cursor: 'pointer', minHeight: 300 }}
      {...rootProps}
    >
      <Typography component="div" variant="h6" gutterBottom>
        {intl.formatMessage({ id: 'practice.upload' })}
      </Typography>
      <input {...getInputProps()} />
      {showUploader(isDragActive, isDragReject)}
    </Box>
  );
};

export default MediaUploadZone;
