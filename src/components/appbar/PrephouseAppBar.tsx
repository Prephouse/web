import { ReactElement, cloneElement, memo, useState } from 'react';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import {
  AppBar,
  Button,
  IconButton,
  Stack,
  Toolbar,
  styled,
  useScrollTrigger,
} from '@mui/material';

import NavigationHeading from 'components/appbar/NavigationHeading';
import NavigationHamburgerMenu from 'components/appbar/hamburger/NavigationHamburgerMenu';
import NavigationPreference from 'components/appbar/preference/NavigationPreference';
import NavigationProfile from 'components/appbar/profile/NavigationProfile';
import ProfileButtons from 'components/appbar/profile/ProfileButtons';
import HeavyDivider from 'components/common/HeavyDivider';

import useAppSelector from 'hooks/useAppSelector';

import { NAVIGATION_BLACK, NAVIGATION_HOVER_GREY } from 'styles/colours';

import navigationDestinations from 'values/appbar/navigationDestinations';

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

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const PrephouseAppBar = () => {
  const user = useAppSelector(state => state.auth.user);

  const intl = useIntl();

  const [drawerOpened, setDrawerOpened] = useState(false);
  const handleDrawerOpened = (open = !drawerOpened) => {
    setDrawerOpened(open);
  };

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
              aria-label={intl.formatMessage({ id: 'app.navigation.drawer.open' })}
            >
              <MenuIcon />
            </IconButton>
            <NavigationHeading />
            <span style={{ flexGrow: 1 }} />
            <Stack
              sx={{
                display: {
                  xs: 'none',
                  [FULL_NAVIGATION_BREAKPOINT]: 'flex',
                },
              }}
              component="nav"
              direction="row"
              spacing={0.5}
              aria-label={intl.formatMessage({ id: 'app.navigation.bar' })}
            >
              {navigationDestinations.map(({ path, titleId, privateRoute }) =>
                !privateRoute || (privateRoute && user) ? (
                  <Button
                    key={`nav-button-${titleId}`}
                    sx={{
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
                ) : null
              )}
            </Stack>
            <HeavyDivider orientation="vertical" />
            {user ? (
              <NavigationProfile />
            ) : (
              <>
                <ProfileButtons />
                <NavigationPreference sx={{ ml: 2 }} />
              </>
            )}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Offset />
      <NavigationHamburgerMenu drawerOpened={drawerOpened} onDrawerOpened={handleDrawerOpened} />
    </>
  );
};

export default memo(PrephouseAppBar);
