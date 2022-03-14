import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';

import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';

import PageContainer from 'components/common/container/PageContainer';

import { useGetLeaderboardOverviewQuery, useGetLeaderboardQuery } from 'services/prephouse';

const ENTRIES_PER_PAGE = 25;

const Leaderboard = () => {
  const intl = useIntl();

  const [page, setPage] = useState(1);

  const { data: leaderboardOverview } = useGetLeaderboardOverviewQuery();
  const { data: leaderboard } = useGetLeaderboardQuery({ page, per_page: ENTRIES_PER_PAGE });

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'leaderboard.title' })} />
      <PageContainer>
        <section id="leaderboard">
          <Typography component="h2" variant="h4">
            {intl.formatMessage({ id: 'leaderboard.title' })}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ my: 2, '& *': { textAlign: 'center' } }}>
            <Paper variant="outlined" sx={{ width: '100%', padding: 2 }}>
              <Typography component="h3">
                {intl.formatMessage({ id: 'leaderboard.score.average' })}
              </Typography>
              <Typography variant="h2">
                {leaderboardOverview?.averageOverallScoreUser
                  ? intl.formatNumber(leaderboardOverview.averageOverallScoreUser)
                  : intl.formatMessage({ id: 'leaderboard.score.missing' })}
              </Typography>
            </Paper>
            <Paper variant="outlined" sx={{ width: '100%', padding: 2 }}>
              <Typography component="h3">
                {intl.formatMessage({ id: 'leaderboard.score.latest' })}
              </Typography>
              <Typography variant="h2">
                {leaderboardOverview?.latestOverallScore
                  ? intl.formatNumber(leaderboardOverview.latestOverallScore)
                  : intl.formatMessage({ id: 'leaderboard.score.missing' })}
              </Typography>
            </Paper>
          </Stack>
          <TableContainer component={Paper}>
            <Table stickyHeader aria-label={intl.formatMessage({ id: 'leaderboard.title' })}>
              <TableHead>
                <TableRow>
                  <TableCell align="center" padding="checkbox" sx={{ px: 2 }}>
                    {intl.formatMessage({ id: 'leaderboard.table.standing' })}
                  </TableCell>
                  <TableCell align="center">
                    {intl.formatMessage({ id: 'leaderboard.table.username' })}
                  </TableCell>
                  <TableCell align="center">
                    {intl.formatMessage({ id: 'leaderboard.table.score' })}
                  </TableCell>
                  <TableCell align="center">
                    {intl.formatMessage({ id: 'leaderboard.table.date' })}
                  </TableCell>
                  <TableCell align="center">
                    {intl.formatMessage({ id: 'leaderboard.table.type' })}
                  </TableCell>
                  <TableCell align="center">
                    {intl.formatMessage({ id: 'leaderboard.table.engine' })}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leaderboard?.uploads.map(upload => (
                  <TableRow key={upload.sessionId.toString()}>
                    <TableCell component="th" scope="row" align="center">
                      {intl.formatNumber(upload.standing)}
                    </TableCell>
                    <TableCell align="center">{upload.username}</TableCell>
                    <TableCell align="center">{intl.formatNumber(upload.score)}</TableCell>
                    <TableCell align="center">
                      {intl.formatDate(new Date(upload.dateUploaded), {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                      })}
                    </TableCell>
                    <TableCell align="center">{upload.categoryName}</TableCell>
                    <TableCell align="center">{upload.engineVersion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            rowsPerPageOptions={[ENTRIES_PER_PAGE]}
            count={leaderboard?.uploads.length ?? 0}
            rowsPerPage={ENTRIES_PER_PAGE}
            page={page - 1}
            onPageChange={(event: unknown, newPage: number) => {
              setPage(newPage + 1);
            }}
          />
        </section>
      </PageContainer>
    </>
  );
};

export default Leaderboard;
