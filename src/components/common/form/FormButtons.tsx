import { MouseEvent as ReactMouseEvent } from 'react';

import { Box, Button, CircularProgress, Stack, SxProps } from '@mui/material';

interface Props {
  primaryText: string;
  onPrimaryClick?: (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => void;
  primaryDisabled?: boolean;
  secondaryText?: string;
  onSecondaryClick?: (event: ReactMouseEvent<HTMLButtonElement, MouseEvent>) => void;
  isLoading?: boolean;
  loadingText?: string;
  secondaryColor?:
    | 'error'
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'success'
    | 'info'
    | 'warning'
    | undefined;
  direction?: 'row' | 'column-reverse';
  sx?: SxProps;
}

const FormButtons = ({
  primaryText,
  onPrimaryClick,
  primaryDisabled = false,
  secondaryText,
  onSecondaryClick,
  secondaryColor = 'secondary',
  isLoading = false,
  loadingText,
  direction = 'row',
  sx,
}: Props) => (
  <Stack
    direction={direction}
    spacing={direction === 'row' ? 2 : 0}
    sx={{ alignItems: 'baseline', justifyContent: 'space-between' }}
  >
    <Box sx={{ width: direction === 'row' ? '25%' : '100%' }}>
      {secondaryText && (
        <Button
          variant="contained"
          color={secondaryColor}
          fullWidth
          sx={{ my: 0.5, ...sx }}
          onClick={onSecondaryClick}
        >
          {secondaryText}
        </Button>
      )}
    </Box>
    <Box sx={{ width: direction === 'row' ? '25%' : '100%' }}>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 1, mb: 0.5, ...sx }}
        onClick={onPrimaryClick}
        disabled={isLoading || primaryDisabled}
      >
        {isLoading ? (
          <>
            <CircularProgress size={24} />
            {loadingText && <Button> &emsp;{loadingText}&hellip;</Button>}
          </>
        ) : (
          primaryText
        )}
      </Button>
    </Box>
  </Stack>
);

export default FormButtons;
