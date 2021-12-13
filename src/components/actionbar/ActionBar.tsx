import { ReactElement, cloneElement } from 'react';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

import { Button, Typography, styled, useScrollTrigger } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import { HOME_PATH } from '../../strings/paths';

import { NAVIGATION_BLACK, NAVIGATION_HOVER_GREY } from '../../styles/colours';

import navigationDestinations from '../../values/actionbar/navigationDestinations';

import HeavyDivider from '../common/HeavyDivider';
import PlainRouterLink from '../common/PlainRouterLink';
import ProfileDropdown from './ProfileDropdown';

interface Props {
  children: ReactElement;
}

const BlackToolbar = styled(Toolbar)(({ theme }) => ({
  backgroundColor: NAVIGATION_BLACK,
  color: theme.palette.common.white,
}));

const ElevationScroll = ({ children }: Props) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const ActionBar = () => {
  const intl = useIntl();

  return (
    <header>
      <ElevationScroll>
        <AppBar position="fixed">
          <BlackToolbar>
            <Typography
              component="h1"
              variant="h4"
              sx={{
                display: 'inline-block',
                marginRight: 2,
              }}
            >
              <PlainRouterLink to={HOME_PATH}>
                {intl.formatMessage({ id: 'app.title' })}
              </PlainRouterLink>
            </Typography>
            <span style={{ flexGrow: 1 }} />
            <nav>
              {navigationDestinations.map(({ path, titleId }) => (
                <Button
                  key={`nav-button-${titleId}`}
                  sx={{
                    marginRight: 1,
                    color: 'primary.contrastText',
                    borderRadius: 3,
                    textTransform: 'none',
                    textOverflow: 'nowrap',
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      backgroundColor: NAVIGATION_HOVER_GREY,
                    },
                  }}
                  component={RouterLink}
                  to={path}
                >
                  {intl.formatMessage({ id: titleId })}
                </Button>
              ))}
            </nav>
            <HeavyDivider orientation="vertical" />
            <ProfileDropdown />
          </BlackToolbar>
        </AppBar>
      </ElevationScroll>
      <Offset />
    </header>
  );
};

export default ActionBar;
