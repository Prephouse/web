import { PureComponent, ReactElement, Ref, forwardRef } from 'react';
import { WrappedComponentProps, injectIntl } from 'react-intl';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Slide,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';

interface Props extends WrappedComponentProps {
  open: boolean;
  dialogContentText?: string;
  onCancel?: (...args: unknown[]) => void;
  onReject?: (...args: unknown[]) => void;
  onApprove: (...args: unknown[]) => void;
}

const Transition = forwardRef(
  ({ children, ...props }: TransitionProps & { children: ReactElement }, ref: Ref<unknown>) => (
    <Slide direction="up" ref={ref} {...props}>
      {children}
    </Slide>
  )
);

class ConfirmationDialog extends PureComponent<Props> {
  override render() {
    const { open, dialogContentText, onCancel, onReject, onApprove, intl }: Props = this.props;
    return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
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
  }
}

export default injectIntl(ConfirmationDialog);
