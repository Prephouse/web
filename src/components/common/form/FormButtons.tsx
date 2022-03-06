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
  sx,
}: Props) => (
  <Stack
    direction="row"
    spacing={2}
    sx={{ alignItems: 'baseline', justifyContent: 'space-between' }}
  >
    <Box sx={{ width: '25%' }}>
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
    <Box sx={{ width: '25%' }}>
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
