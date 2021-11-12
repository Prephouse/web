import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useIntl } from 'react-intl';

import { Box, Typography } from '@mui/material';

import { Medium } from '../../utils/enums';

interface Props {
  medium: Medium;
}

const MediaUploadZone = ({ medium }: Props) => {
  const intl = useIntl();

  const [video, setVideo] = useState<File | null>(null);

  const getAcceptedMimes: () => string[] = () => {
    if (medium === Medium.VIDEO_AND_AUDIO) {
      return ['video/mp4'];
    } else {
      return ['audio/mp4', 'audio/wav'];
    }
  };
  const onDrop = useCallback(acceptedFiles => {
    setVideo(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: getAcceptedMimes(),
    noClick: !!video,
    multiple: false,
  });
  const { ref, ...rootProps } = getRootProps();

  const showUploader = (isDragActive = false, isDragReject = false) => {
    let Zone: React.ReactNode = <> </>;
    if (!video) {
      let msg: string;
      if (isDragActive) {
        msg = intl.formatMessage({ id: 'practice.upload.dropImage' });
      } else if (isDragReject) {
        msg = intl.formatMessage({ id: 'practice.upload.mime.error' });
      } else {
        msg = intl.formatMessage({ id: 'practice.upload.dragDropClick' });
      }
      Zone = (
        <Typography component="div" variant="body2">
          {msg}
        </Typography>
      );
    }
    return Zone;
  };

  return (
    <Box
      ref={ref}
      width={1}
      p={3}
      border="0.5px dashed"
      borderRadius={6}
      sx={{ cursor: 'pointer' }}
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
