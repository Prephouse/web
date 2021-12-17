import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';

import { Typography } from '@mui/material';

import CenteredDiv from '../common/CenteredDiv';

const Home = () => {
  const intl = useIntl();

  return (
    <>
      <Helmet>
        <title>{intl.formatMessage({ id: 'app.title' })}</title>
      </Helmet>
      <CenteredDiv style={{ height: '70vh' }}>
        <Typography component="h2" variant="h5" />
      </CenteredDiv>
    </>
  );
};

export default Home;
