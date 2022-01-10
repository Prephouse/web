import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useIntl } from 'react-intl';

import { Box, Typography } from '@mui/material';

import { SessionMedium, SessionType } from '../../../states/practice/enums';

interface Props {
  sessionType: SessionType;
  medium: SessionMedium;
  onSubmit: (src: string) => void;
}

const MediaUploadZone = ({ medium, onSubmit }: Props) => {
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
      onSubmit(URL.createObjectURL(acceptedFiles[0]));
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
    <Box
      ref={ref}
      width={1}
      p={3}
      my={3}
      border="0.5px dashed"
      borderRadius="6px"
      sx={{ cursor: 'pointer', minHeight: 300 }}
      {...rootProps}
    >
      <Typography component="div" variant="h6" gutterBottom>
        {intl.formatMessage({ id: 'practice.upload' })}
      </Typography>
      <input {...getInputProps()} />
      {showUploader()}
    </Box>
  );
};

export default MediaUploadZone;
