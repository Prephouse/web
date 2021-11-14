import React from 'react';

import { Box, Button, CircularProgress } from '@mui/material';

interface Props {
  primaryText: string;
  onPrimaryClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  primaryDisabled?: boolean;
  secondaryText?: string;
  onSecondaryClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
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
}: Props) => {
  return (
    <Box>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ margin: theme => theme.spacing(0.5, 0) }}
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
      {secondaryText && (
        <Button
          variant="contained"
          color={secondaryColor}
          fullWidth
          sx={{ margin: theme => theme.spacing(0.5, 0) }}
          onClick={onSecondaryClick}
        >
          {secondaryText}
        </Button>
      )}
    </Box>
  );
};

export default FormButtons;
