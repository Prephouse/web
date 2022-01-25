import { memo } from 'react';

import { Box } from '@mui/material';

import { NAVIGATION_BLACK } from 'styles/colours';

const Footer = () => (
  <Box component="footer" bgcolor={NAVIGATION_BLACK} color="primary.contrastText">
    <p>&copy; {new Date().getFullYear()} Prephouse. All rights reserved.</p>
  </Box>
);

export default memo(Footer);
