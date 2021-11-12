import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

import { Pagination, Typography } from '@mui/material';

import PageContainer from '../common/PageContainer';

const TipBook = () => {
  const intl = useIntl();

  return (
    <>
      <Helmet>
        <title>{intl.formatMessage({ id: 'tips.title' })}</title>
      </Helmet>
      <PageContainer>
        <Typography component="h2" variant="h4">
          {intl.formatMessage({ id: 'tips.title.expanded' })}
        </Typography>
        <Pagination
          count={10}
          boundaryCount={3}
          shape="rounded"
          color="primary"
          size="large"
          showFirstButton
          showLastButton
        />
      </PageContainer>
    </>
  );
};

export default TipBook;