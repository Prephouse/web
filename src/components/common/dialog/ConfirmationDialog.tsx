import { useIntl } from 'react-intl';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@mui/material';

interface Props {
  open: boolean;
  dialogContentText?: string;
  approveText?: string;
  onApprove: (...args: unknown[]) => void;
  rejectText?: string;
  onReject?: (...args: unknown[]) => void;
  onCancel?: (...args: unknown[]) => void;
}

const ConfirmationDialog = ({
  open,
  dialogContentText,
  approveText,
  onApprove,
  rejectText,
  onReject,
  onCancel,
}: Props) => {
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
        {onReject && (
          <Button onClick={onReject}>
            {rejectText || intl.formatMessage({ id: 'common.no' })}
          </Button>
        )}
        <Button onClick={onApprove} autoFocus>
          {approveText || intl.formatMessage({ id: 'common.yes' })}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationDialog;
