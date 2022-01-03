import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';

import PageContainer from '../common/PageContainer';
import AppPanel from './AppPanel';
import IntroductoryPanel from './IntroductoryPanel';
import TeamPanel from './TeamPanel';

const About = () => {
  const intl = useIntl();

  return (
    <PageContainer>
      <Helmet>
        <title>{intl.formatMessage({ id: 'about.title' })}</title>
      </Helmet>
      <IntroductoryPanel />
      <TeamPanel />
      <AppPanel />
    </PageContainer>
  );
};

export default About;
