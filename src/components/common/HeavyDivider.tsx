import { memo } from 'react';

import Divider from '@mui/material/Divider';

import { NAVIGATION_HOVER_GREY } from 'styles/colours';

interface HeavyDividerProps {
  orientation?: 'horizontal' | 'vertical';
}

const HeavyDivider = ({ orientation = 'horizontal' }: HeavyDividerProps) => (
  <Divider
    orientation={orientation}
    variant="middle"
    flexItem
    sx={{
      marginLeft: 2,
      marginRight: 2,
      backgroundColor: NAVIGATION_HOVER_GREY,
    }}
  />
);

export default memo(HeavyDivider);
