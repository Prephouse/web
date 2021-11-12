import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useIntl } from 'react-intl';

import { Box, Typography } from '@mui/material';

const accept: string[] = [
  // TODO determine what MIME types to accept
];

const MediaUploadZone = () => {
  const intl = useIntl();

  const [video, setVideo] = useState<File | null>(null);

  const onDrop = useCallback(acceptedFiles => {
    setVideo(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept,
    noClick: !!video,
    multiple: false,
  });
  const { ref, ...rootProps } = getRootProps();

  const showUploader = (isDragActive: boolean = false, isDragReject: boolean = false) => {
    let Zone: React.ReactNode = <> </>;
    if (!video) {
      let Message: React.ReactNode;
      if (isDragActive) {
        Message = intl.formatMessage({ id: 'practice.upload.dropImage' });
      } else if (isDragReject) {
        Message = intl.formatMessage({ id: 'practice.upload.mime.error' });
      } else {
        Message = (
          <>
            {intl.formatMessage({ id: 'practice.upload.dragDropClick' })}
            <br />
            <em>{intl.formatMessage({ id: 'practice.upload.mime.warning' })}</em>
          </>
        );
      }
      Zone = (
        <Typography component="div" variant="body2">
          {Message}
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
