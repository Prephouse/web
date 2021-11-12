import { Helmet } from 'react-helmet';

import PageContainer from '../common/PageContainer';
import TeamPanel from './TeamPanel';

const Mission = () => {
  return (
    <PageContainer>
      <Helmet>
        <title>About</title>
      </Helmet>
      <TeamPanel />
    </PageContainer>
  );
};

export default Mission;
