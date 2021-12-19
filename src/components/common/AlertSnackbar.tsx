import { Alert, Snackbar } from '@mui/material';

export interface BaseProps {
  severity: 'success' | 'info' | 'warning' | 'error' | undefined;
  duration?: number;
  message: string;
}

interface Props extends BaseProps {
  open: boolean;
  onClose: () => void;
}

const AlertSnackbar = ({ open, onClose, severity, duration = 5000, message }: Props) => (
  <Snackbar
    role="status"
    open={open}
    transitionDuration={500}
    autoHideDuration={duration}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    onClose={onClose}
    disableWindowBlurListener
  >
    <Alert elevation={6} variant="filled" onClose={onClose} severity={severity}>
      {message}
    </Alert>
  </Snackbar>
);

export default AlertSnackbar;
