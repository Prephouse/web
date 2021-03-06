import { KeyboardEvent, MouseEvent } from 'react';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import NavigationHeading from 'components/appbar/NavigationHeading';
import ProfileButtons from 'components/appbar/profile/ProfileButtons';

import useAppSelector from 'hooks/useAppSelector';

import { NAVIGATION_BLACK } from 'styles/colours';

import navigationDestinations from 'values/appbar/navigationDestinations';

interface Props {
  drawerOpened: boolean;
  onDrawerOpened: (open: boolean) => void;
}

const NavigationHamburgerMenu = ({ drawerOpened, onDrawerOpened }: Props) => {
  const user = useAppSelector(state => state.auth.user);

  const intl = useIntl();

  const theme = useTheme();
  const shouldAutoHide = useMediaQuery(theme.breakpoints.up('md'));

  if (shouldAutoHide) {
    onDrawerOpened(false);
  }

  const toggleDrawer = (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as KeyboardEvent).key === 'Tab' || (event as KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    onDrawerOpened(open);
  };

  return (
    <Drawer anchor="top" open={drawerOpened} onClose={toggleDrawer(false)}>
      <Box role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
        <Toolbar
          sx={{
            backgroundColor: NAVIGATION_BLACK,
            color: 'common.white',
          }}
        >
          <IconButton
            sx={{
              marginRight: 2,
            }}
            size="large"
            edge="start"
            color="inherit"
            onClick={() => toggleDrawer(false)}
            aria-label={intl.formatMessage({ id: 'app.navigation.drawer.close' })}
          >
            <CloseIcon />
          </IconButton>
          <NavigationHeading
            sx={{
              color: 'primary.contrastText',
            }}
          />
        </Toolbar>
        <Divider />
        <List disablePadding>
          {!user && (
            <>
              <ListItem>
                <ProfileButtons fullWidth />
              </ListItem>
              <Divider />
            </>
          )}
          {navigationDestinations.map(({ path, titleId, privateRoute }) =>
            !privateRoute || (privateRoute && user) ? (
              <ListItem key={`nav-drawer-item-${titleId}`} component={RouterLink} to={path} button>
                <ListItemText primary={intl.formatMessage({ id: titleId })} />
              </ListItem>
            ) : null
          )}
        </List>
      </Box>
    </Drawer>
  );
};

export default NavigationHamburgerMenu;
