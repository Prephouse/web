import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

import {
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { useGetProgressSessionsQuery } from 'services/prephouse';

const ProgressTable = () => {
  const intl = useIntl();
  const { data: progressSessionsData } = useGetProgressSessionsQuery();

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label={intl.formatMessage({ id: 'progress.title' })}>
        <TableHead>
          <TableRow>
            <TableCell align="center" padding="checkbox" sx={{ px: 2 }}>
              {intl.formatMessage({ id: 'progress.table.date' })}
            </TableCell>
            <TableCell align="center">
              {intl.formatMessage({ id: 'progress.table.type' })}
            </TableCell>
            <TableCell align="center">
              {intl.formatMessage({ id: 'progress.table.score.overall' })}
            </TableCell>
            <TableCell align="center">
              {intl.formatMessage({ id: 'progress.table.score.background' })}
            </TableCell>
            <TableCell align="center">
              {intl.formatMessage({ id: 'progress.table.score.emotion' })}
            </TableCell>
            <TableCell align="center">
              {intl.formatMessage({ id: 'progress.table.score.filler' })}
            </TableCell>
            <TableCell align="center">
              {intl.formatMessage({ id: 'progress.table.score.gaze' })}
            </TableCell>
            <TableCell align="center">
              {intl.formatMessage({ id: 'progress.table.score.pitch' })}
            </TableCell>
            <TableCell align="center">
              {intl.formatMessage({ id: 'progress.table.score.pause' })}
            </TableCell>
            <TableCell align="center">
              {intl.formatMessage({ id: 'progress.table.score.volume' })}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {progressSessionsData?.sessions.map(session => (
            <TableRow key={session.sessionId.toString()}>
              <TableCell align="center">
                <Link component={RouterLink} to={`/session/${session.sessionId}`}>
                  {intl.formatDate(new Date(session.date), {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })}
                </Link>
              </TableCell>
              <TableCell align="center">{session.sessionCategory}</TableCell>
              <TableCell align="center">
                {intl.formatNumber(session.scores?.overallScore)}
              </TableCell>
              <TableCell align="center">
                {intl.formatNumber(session.scores?.backgroundLightScore)}
              </TableCell>
              <TableCell align="center">
                {intl.formatNumber(session.scores?.emotionScore)}
              </TableCell>
              <TableCell align="center">
                {intl.formatNumber(session.scores?.fillerWordsScore)}
              </TableCell>
              <TableCell align="center">
                {intl.formatNumber(session.scores?.gazeDirectionScore)}
              </TableCell>
              <TableCell align="center">{intl.formatNumber(session.scores?.pitchScore)}</TableCell>
              <TableCell align="center">
                {intl.formatNumber(session.scores?.silentPausesScore)}
              </TableCell>
              <TableCell align="center">{intl.formatNumber(session.scores?.volumeScore)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ProgressTable;
