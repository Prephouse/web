import { ReactElement, cloneElement, memo, useState } from 'react';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import { AppBar, Button, IconButton, Toolbar, styled, useScrollTrigger } from '@mui/material';

import { NAVIGATION_BLACK, NAVIGATION_HOVER_GREY } from '../../styles/colours';

import navigationDestinations from '../../values/appbar/navigationDestinations';

import HeavyDivider from '../common/HeavyDivider';
import NavigationDrawer from './NavigationDrawer';
import NavigationDropdown from './NavigationDropdown';
import NavigationHeading from './NavigationHeading';

const FULL_NAVIGATION_BREAKPOINT = 'md';

const ElevationScroll = ({ children }: { children: ReactElement }) => {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
};

const NavigationGroup = styled('nav')(({ theme }) => ({
  display: 'flex',
  [theme.breakpoints.down(FULL_NAVIGATION_BREAKPOINT)]: {
    display: 'none',
  },
}));

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const PrephouseAppBar = () => {
  const intl = useIntl();

  const [drawerOpened, setDrawerOpened] = useState(false);
  const handleDrawerOpened = (open = !drawerOpened) => setDrawerOpened(open);

  return (
    <>
      <ElevationScroll>
        <AppBar position="fixed">
          <Toolbar
            sx={{
              backgroundColor: NAVIGATION_BLACK,
              color: 'common.white',
            }}
          >
            <IconButton
              sx={{
                marginRight: 2,
                display: {
                  xs: 'flex',
                  [FULL_NAVIGATION_BREAKPOINT]: 'none',
                },
              }}
              size="large"
              edge="start"
              color="inherit"
              onClick={() => handleDrawerOpened()}
              aria-label={intl.formatMessage({ id: 'app.navigation.drawer' })}
            >
              <MenuIcon />
            </IconButton>
            <NavigationHeading />
            <span style={{ flexGrow: 1 }} />
            <NavigationGroup aria-label={intl.formatMessage({ id: 'app.navigation.bar' })}>
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
            </NavigationGroup>
            <HeavyDivider orientation="vertical" />
            <NavigationDropdown />
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Offset />
      <NavigationDrawer drawerOpened={drawerOpened} onDrawerOpened={handleDrawerOpened} />
    </>
  );
};

export default memo(PrephouseAppBar);
