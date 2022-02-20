import { MouseEvent as ReactMouseEvent, ReactNode } from 'react';

import { Box, Button } from '@mui/material';

interface Props {
  onClick: (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => void;
  color?: string;
  backgroundColor?: string;
  backgroundHoverColor?: string;
  children?: ReactNode;
  startIcon?: ReactNode;
}

const IdpAuthButton = ({
  backgroundColor,
  backgroundHoverColor,
  children,
  color,
  onClick,
  startIcon,
}: Props) => (
  <Button
    fullWidth
    variant="contained"
    onClick={onClick}
    sx={{
      my: 0.5,
      justifyContent: 'flex-start',
      ...(color ? { color } : {}),
      ...(backgroundColor ? { backgroundColor } : {}),
      ...(backgroundHoverColor
        ? {
            '&:hover': {
              backgroundColor: backgroundHoverColor,
            },
          }
        : {}),
    }}
    startIcon={startIcon}
  >
    <Box
      sx={{
        textAlign: 'center',
        width: '100%',
      }}
    >
      {children}
    </Box>
  </Button>
);

export default IdpAuthButton;
