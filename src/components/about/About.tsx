import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';

import PageContainer from '../common/PageContainer';
import TeamPanel from './TeamPanel';

const Mission = () => {
  const intl = useIntl();

  return (
    <PageContainer>
      <Helmet>
        <title>{intl.formatMessage({ id: 'about.title' })}</title>
      </Helmet>
      <TeamPanel />
    </PageContainer>
  );
};

export default Mission;
