import { useIntl } from 'react-intl';

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkIcon from '@mui/icons-material/Link';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Grid, Typography } from '@mui/material';

import members from '../../values/about/members';

import HorizontalCard from '../common/HorizontalCard';

const TeamPanel = () => {
  const intl = useIntl();

  return (
    <section id="prephouse-team">
      <Typography gutterBottom component="h2" variant="h4">
        {intl.formatMessage({ id: 'about.team' })}
      </Typography>
      <Grid container direction="column" wrap="wrap" spacing={3}>
        {members.map(member => {
          const sites = [
            { href: member.website, nameId: 'common.website', icon: LinkIcon },
            { href: member.linkedin, nameId: 'common.linkedin', icon: LinkedInIcon },
            { href: member.github, nameId: 'common.github', icon: GitHubIcon },
          ];

          return (
            <Grid item key={member.name}>
              <HorizontalCard
                img={
                  <img
                    src={`/images/${member.img}`}
                    alt={member.name}
                    width={240}
                    height={240}
                    loading="lazy"
                  />
                }
                header={<b>{member.name}</b>}
                body={member.bio}
                actions={sites}
              />
            </Grid>
          );
        })}
      </Grid>
    </section>
  );
};

export default TeamPanel;
