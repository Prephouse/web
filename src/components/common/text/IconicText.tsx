import { CSSProperties, ReactNode } from 'react';

import { Box } from '@mui/material';

interface Props {
  id?: string;
  text: string;
  icon: ReactNode;
  style?: CSSProperties;
}

const IconicText = ({ id, text, icon, style }: Props) => (
  <div id={id} style={{ display: 'flex', alignItems: 'center', ...style }}>
    <Box
      component="span"
      id={`${id}--icon`}
      sx={{
        display: 'flex',
        alignItems: 'center',
        marginLeft: 0.5,
        marginRight: 0.5,
      }}
      aria-labelledby={`${id}--text`}
    >
      {icon}
    </Box>
    <span id={`${id}--text`}>{text}</span>
  </div>
);

export default IconicText;
