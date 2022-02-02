import { useIntl } from 'react-intl';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';

interface Props {
  open: boolean;
  dialogContentText?: string;
  onCancel?: (...args: unknown[]) => void;
  onReject?: (...args: unknown[]) => void;
  onApprove: (...args: unknown[]) => void;
}

const ConfirmationDialog = ({ open, dialogContentText, onCancel, onReject, onApprove }: Props) => {
  const intl = useIntl();

  return (
    <Dialog
      open={open}
      keepMounted
      fullWidth
      onClose={onCancel}
      aria-labelledby="confirmation-dialog-title"
      aria-describedby="confirmation-dialog-description"
    >
      <DialogContent>
        <DialogContentText id="confirmation-dialog-description">
          {dialogContentText || intl.formatMessage({ id: 'common.dialog.confirm' })}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onReject}>{intl.formatMessage({ id: 'common.no' })}</Button>
        <Button onClick={onApprove} autoFocus>
          {intl.formatMessage({ id: 'common.yes' })}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
