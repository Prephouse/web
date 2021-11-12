import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

import PageContainer from '../common/PageContainer';

const Dashboard = () => {
  const intl = useIntl();

  return (
    <>
      <Helmet>
        <title>{intl.formatMessage({ id: 'dashboard.title' })}</title>
      </Helmet>
      <PageContainer></PageContainer>
    </>
  );
};

export default Dashboard;
