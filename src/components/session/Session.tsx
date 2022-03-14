import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';
import { useParams } from 'react-router-dom';

import { Paper, Typography } from '@mui/material';

import PageContainer from 'components/common/container/PageContainer';

import { useGetSessionQuery } from 'services/prephouse';

import Playback from './Playback';
import ScoreChart from './ScoreChart';
import TextFeedback from './TextFeedback';
import TimestampFeedback from './TimestampFeedback';

const Session = () => {
  const { id } = useParams();
  const intl = useIntl();
  const { data: sessionData } = useGetSessionQuery({ session_id: id ?? '' });
  const dateString = sessionData?.date
    ? intl.formatDate(new Date(sessionData?.date), {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      })
    : '';
  const title = `${intl.formatMessage({ id: 'session.title' })} - ${dateString}`;

  return (
    <>
      <Helmet title={title} />
      <PageContainer>
        <section id="playback">
          <Typography component="h2" variant="h4" sx={{ mb: 2 }}>
            {title}
          </Typography>
          <Typography component="h5" variant="h5" sx={{ my: 4 }}>
            {intl.formatMessage({ id: 'session.playback' })}
          </Typography>
          {sessionData?.cloudfrontUrl && <Playback videoUrl={sessionData.cloudfrontUrl} />}
        </section>
        <section id="summary">
          <Typography component="h5" variant="h5" sx={{ my: 4 }}>
            {intl.formatMessage({ id: 'session.summary.title' })}
          </Typography>
          <Paper elevation={2} sx={{ p: 2 }}>
            <Typography component="p">{sessionData?.textSummary}</Typography>
          </Paper>
        </section>
        <section id="feedback-numerical">
          <Typography component="h5" variant="h5" sx={{ my: 4 }}>
            {intl.formatMessage({ id: 'session.chart.title' })}
          </Typography>
          <ScoreChart sessionData={sessionData} />
        </section>
        <section id="feedback-textual">
          <Typography component="h5" variant="h5" sx={{ my: 4 }}>
            {intl.formatMessage({ id: 'session.text.title' })}
          </Typography>
          <TextFeedback textFeedback={sessionData?.textFeedback} />
        </section>
        <section id="feedback-timestamp">
          <Typography component="h5" variant="h5" sx={{ my: 4 }}>
            {intl.formatMessage({ id: 'session.timestamp.title' })}
          </Typography>
          <TimestampFeedback timestampFeedback={sessionData?.timestampFeedback} />
        </section>
      </PageContainer>
    </>
  );
};

export default Session;
