import { useIntl } from 'react-intl';

import Typography from '@mui/material/Typography';

import ConfirmationDialog from 'components/common/dialog/ConfirmationDialog';

interface Props {
  error: Error;
  resetErrorBoundary: () => void;
}

const ErrorDialog = ({ error, resetErrorBoundary }: Props) => {
  const intl = useIntl();

  return (
    <ConfirmationDialog
      open
      dialogContentText={
        <div>
          <Typography paragraph>{intl.formatMessage({ id: 'common.wrong' })}</Typography>{' '}
          <pre>{error.message}</pre>
        </div>
      }
      approveText={intl.formatMessage({ id: 'common.ok' })}
      onApprove={resetErrorBoundary}
    />
  );
};

export default ErrorDialog;
