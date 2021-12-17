import { Helmet } from 'react-helmet-async';

import PageContainer from '../common/PageContainer';
import TeamPanel from './TeamPanel';

const Mission = () => (
  <PageContainer>
    <Helmet>
      <title>About</title>
    </Helmet>
    <TeamPanel />
  </PageContainer>
);

export default Mission;
