import { useIntl } from 'react-intl';

import AppsIcon from '@mui/icons-material/Apps';
import CodeIcon from '@mui/icons-material/Code';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Chip, Grid, Typography } from '@mui/material';

import apps from '../../values/about/apps';

import HorizontalCard from '../common/HorizontalCard';

const AppPanel = () => {
  const intl = useIntl();

  return (
    <section id="prephouse-apps">
      <Typography gutterBottom component="h2" variant="h4">
        {intl.formatMessage({ id: 'about.apps' })}
      </Typography>
      <Grid container direction="row" spacing={3}>
        {apps.map(app => {
          const actions = [
            { href: app.productionUrl, nameId: 'about.apps.application', icon: AppsIcon },
            {
              href: app.sourceCodeUrl,
              nameId: 'about.apps.sourceCode',
              icon: GitHubIcon,
            },
          ];
          return (
            <Grid item key={`ph-app-${app.internalName}`} xs={12} sm={6}>
              <HorizontalCard
                header={
                  <>
                    <b>{app.marketingName}</b>
                    <br />
                    {app.internalName}
                  </>
                }
                body={
                  <>
                    {app.description}
                    {app.points && (
                      <ul>
                        {app.points.map(v => (
                          <li key={`${app.internalName}-point-${v}`}>{v}</li>
                        ))}
                      </ul>
                    )}
                  </>
                }
                bodyComponent="div"
                extra={
                  <div>
                    {app.techStack.map((content: string) => (
                      <Chip
                        key={content}
                        sx={{
                          margin: 0.5,
                        }}
                        icon={<CodeIcon />}
                        label={content}
                      />
                    ))}
                  </div>
                }
                actions={actions}
                style={{ height: '100%' }}
              />
            </Grid>
          );
        })}
      </Grid>
    </section>
  );
};

export default AppPanel;
