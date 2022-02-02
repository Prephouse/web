import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';

import CenteredDiv from 'components/common/container/CenteredDiv';

const Home = () => {
  const intl = useIntl();

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'app.title' })} />
      <CenteredDiv style={{ height: '70vh' }} />
    </>
  );
};

export default Home;
