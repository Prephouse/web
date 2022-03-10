import { useIntl } from 'react-intl';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { SessionResponseSchema } from 'schemas/session/sessionSchema';

const TimestampFeedback = ({
  timestampFeedback,
}: {
  timestampFeedback: SessionResponseSchema['timestampFeedback'] | undefined;
}) => {
  const intl = useIntl();

  return (
    <TableContainer component={Paper} elevation={2}>
      <Table stickyHeader aria-label={intl.formatMessage({ id: 'progress.title' })}>
        <TableHead>
          <TableRow>
            <TableCell align="center" padding="checkbox" sx={{ px: 2 }}>
              {intl.formatMessage({ id: 'session.table.category' })}
            </TableCell>
            <TableCell align="center">
              {intl.formatMessage({ id: 'session.table.description' })}
            </TableCell>
            <TableCell align="center">
              {intl.formatMessage({ id: 'session.table.timestart' })}
            </TableCell>
            <TableCell align="center">
              {intl.formatMessage({ id: 'session.table.timeend' })}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {timestampFeedback?.map(feedback => (
            <TableRow key={feedback.feedbackId.toString()}>
              <TableCell align="center">{feedback.category}</TableCell>
              <TableCell align="center">{`${feedback.subcategory}${
                feedback.comment ? ` - ${feedback.comment}` : ''
              }`}</TableCell>
              <TableCell align="center">{intl.formatNumber(feedback?.timeStart)}</TableCell>
              <TableCell align="center">{intl.formatNumber(feedback?.timeEnd)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TimestampFeedback;
