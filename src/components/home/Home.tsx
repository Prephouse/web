import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

import { Button, Container, Grid, Typography } from '@mui/material';

import useAppSelector from 'hooks/useAppSelector';

import { PRACTICE_PATH, USER_SIGN_UP_PATH } from 'strings/paths';

const Home = () => {
  const intl = useIntl();

  const user = useAppSelector(state => state.auth.user);

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'app.title' })} />
      <Container sx={{ minHeight: '100%' }}>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          sx={{ minHeight: '100vh' }}
        >
          <Grid item xs={8}>
            <Typography
              component="h2"
              variant="h2"
              sx={{
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                backgroundSize: 'cover',
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1557682224-5b8590cd9ec5?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=800&fit=max&ixid=eyJhcHBfaWQiOjF9')",
              }}
            >
              {intl.formatMessage({ id: 'home.marketing.title' })}
            </Typography>
            <Typography variant="h6">
              {intl.formatMessage({ id: 'home.marketing.subtitle' })}
            </Typography>
            <Button
              sx={{ my: 5 }}
              component={RouterLink}
              to={user ? PRACTICE_PATH : USER_SIGN_UP_PATH}
              variant="contained"
              size="large"
              color="primary"
            >
              {intl.formatMessage({ id: 'home.marketing.action.getStarted' })}
            </Button>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
