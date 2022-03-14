import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';

import { Typography } from '@mui/material';

import PageContainer from 'components/common/container/PageContainer';

import ProgressGraph from './ProgressChart';
import ProgressTable from './ProgressTable';

const Progress = () => {
  const intl = useIntl();

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'progress.title' })} />
      <PageContainer>
        <section id="progress-graph">
          <Typography component="h2" variant="h4" sx={{ my: 4 }}>
            {intl.formatMessage({ id: 'progress.title' })}
          </Typography>
          <ProgressGraph />
        </section>
        <section id="progress-table">
          <Typography component="h2" variant="h4" sx={{ my: 4 }}>
            {intl.formatMessage({ id: 'progress.table.title' })}
          </Typography>
          <ProgressTable />
        </section>
      </PageContainer>
    </>
  );
};

export default Progress;
