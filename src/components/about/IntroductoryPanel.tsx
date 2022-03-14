import { useIntl } from 'react-intl';

import { Typography } from '@mui/material';

const IntroductoryPanel = () => {
  const intl = useIntl();

  return (
    <section id="intro">
      <Typography component="h2" variant="h3" color="primary" gutterBottom align="center">
        {intl.formatMessage({ id: 'about.mission.slogan' })}
      </Typography>
      <Typography variant="body1" paragraph>
        {intl.formatMessage({ id: 'about.mission.abstract' })}
      </Typography>
    </section>
  );
};

export default IntroductoryPanel;
