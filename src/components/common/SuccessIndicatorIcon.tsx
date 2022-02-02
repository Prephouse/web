import { memo } from 'react';

import { Box } from '@mui/material';

interface Props {
  success: boolean;
}

const SuccessIndicatorIcon = ({ success }: Props) => (
  <Box
    component="span"
    sx={{
      display: 'inline-block',
      height: '12px',
      width: '12px',
      borderRadius: '50%',
      backgroundColor: theme => theme.palette[success ? 'success' : 'error'].main,
    }}
  />
);

export default memo(SuccessIndicatorIcon);
