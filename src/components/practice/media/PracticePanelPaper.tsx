import { ReactNode } from 'react';

import { Paper } from '@mui/material';

interface Props {
  children: ReactNode;
}

const PracticePanelPaper = ({ children }: Props) => (
  <Paper elevation={3} sx={{ my: 2, padding: 2 }}>
    {children}
  </Paper>
);

export default PracticePanelPaper;
