import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Button, Divider, Stack, Typography } from '@mui/material';

import CenteredDiv from 'components/common/container/CenteredDiv';
import IconicText from 'components/common/text/IconicText';

import useAppSelector from 'hooks/useAppSelector';

import { ABOUT_PATH, PRACTICE_PATH, USER_SIGN_UP_PATH } from 'strings/paths';

const Home = () => {
  const intl = useIntl();

  const user = useAppSelector(state => state.auth.user);

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'app.title' })} />
      <CenteredDiv style={{ minHeight: '70vh' }}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={1}
          sx={{ mx: 3 }}
        >
          <Typography component="h2" variant="h3">
            {intl.formatMessage({ id: 'home.marketing.title' })}
          </Typography>
          <Typography variant="subtitle1">
            {intl.formatMessage({ id: 'home.marketing.subtitle' })}
          </Typography>
          <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2}>
            <Button
              component={RouterLink}
              to={user ? PRACTICE_PATH : USER_SIGN_UP_PATH}
              variant="contained"
              size="large"
              color="primary"
            >
              {intl.formatMessage({ id: 'home.marketing.action.getStarted' })}
            </Button>
            <Button
              component={RouterLink}
              to={ABOUT_PATH}
              variant="contained"
              size="large"
              color="secondary"
            >
              {intl.formatMessage({ id: 'home.marketing.action.learnMore' })}
            </Button>
          </Stack>
          <Typography component="div" variant="subtitle1" sx={{ padding: 2 }}>
            {[...Array(5).keys()].map(num => {
              const id = `home.highlight.${num}`;
              return (
                <IconicText key={id} text={intl.formatMessage({ id })} icon={<CheckCircleIcon />} />
              );
            })}
          </Typography>
        </Stack>
      </CenteredDiv>
    </>
  );
};

export default Home;
