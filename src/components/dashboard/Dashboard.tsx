import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';

import PageContainer from '../common/PageContainer';

const Dashboard = () => {
  const intl = useIntl();

  return (
    <>
      <Helmet>
        <title>{intl.formatMessage({ id: 'dashboard.title' })}</title>
      </Helmet>
      <PageContainer />
    </>
  );
};

export default Dashboard;
