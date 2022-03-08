import { useIntl } from 'react-intl';

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Grid, Typography } from '@mui/material';

import HorizontalCard from 'components/common/HorizontalCard';

import consultants from 'values/about/consultants';
import members from 'values/about/members';

const TeamPanel = () => {
  const intl = useIntl();

  return (
    <section id="prephouse-team">
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
      <br />
      <Typography gutterBottom component="h2" variant="h4">
        {intl.formatMessage({ id: 'about.team' })}
      </Typography>
      <Grid container direction="column" wrap="wrap" spacing={3}>
        {members.map(member => (
          <Grid item key={member.name}>
            <HorizontalCard
              img={
                <img
                  src={`/images/members/${member.img}`}
                  alt={member.name}
                  width={240}
                  height={240}
                  loading="lazy"
                />
              }
              header={<b>{member.name}</b>}
              body={member.bio}
              actions={[
                { href: member.website, nameId: 'common.website', icon: LinkIcon },
                { href: member.linkedin, nameId: 'common.linkedin', icon: LinkedInIcon },
                { href: member.github, nameId: 'common.github', icon: GitHubIcon },
              ]}
            />
          </Grid>
        ))}
      </Grid>
    </section>
  );
};

export default TeamPanel;
