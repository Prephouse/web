import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';

import { Typography } from '@mui/material';

import PageContainer from 'components/common/container/PageContainer';

import ProgressGraph from './ProgressGraph';
import ProgressTable from './ProgressTable';

const Progress = () => {
  const intl = useIntl();

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'progress.title' })} />
      <PageContainer>
        <Typography component="h2" variant="h4" sx={{ mb: 2 }}>
          {intl.formatMessage({ id: 'progress.title' })}
        </Typography>
        <ProgressGraph />
        <Typography component="h2" variant="h4" sx={{ mb: 2 }}>
          {intl.formatMessage({ id: 'progress.table.title' })}
        </Typography>
        <ProgressTable />
      </PageContainer>
    </>
  );
};

export default Progress;
