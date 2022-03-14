import { useIntl } from 'react-intl';

import LinkIcon from '@mui/icons-material/Link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Grid, Typography } from '@mui/material';

import HorizontalCard from 'components/common/HorizontalCard';

import consultants from 'values/about/consultants';

const ConsultantPanel = () => {
  const intl = useIntl();
  return (
    <section id="consultants">
      <Typography gutterBottom component="h2" variant="h4">
        {intl.formatMessage({ id: 'about.consultant' })}
      </Typography>
      <Grid container direction="column" wrap="wrap" spacing={3}>
        {consultants.map(consultant => (
          <Grid item key={consultant.name}>
            <HorizontalCard
              img={
                <img
                  src={`/images/consultant/${consultant.img}`}
                  alt={consultant.name}
                  width={240}
                  height={240}
                  loading="lazy"
                />
              }
              header={<b>{consultant.name}</b>}
              body={consultant.bio}
              actions={[
                { href: consultant.website, nameId: 'common.website', icon: LinkIcon },
                { href: consultant.linkedin, nameId: 'common.linkedin', icon: LinkedInIcon },
              ]}
            />
          </Grid>
        ))}
      </Grid>
    </section>
  );
};

export default ConsultantPanel;
