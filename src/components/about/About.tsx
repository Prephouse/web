import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';

import ConsultantPanel from 'components/about/ConsultantPanel';
import IntroductoryPanel from 'components/about/IntroductoryPanel';
import TeamPanel from 'components/about/TeamPanel';
import PageContainer from 'components/common/container/PageContainer';

const About = () => {
  const intl = useIntl();

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'about.title' })} />
      <PageContainer>
        <IntroductoryPanel />
        <TeamPanel />
        <ConsultantPanel />
      </PageContainer>
    </>
  );
};

export default About;
