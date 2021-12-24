import React from 'react';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

import { Box, Divider, Drawer, List, ListItem, ListItemText } from '@mui/material';

import { NAVIGATION_BLACK } from '../../styles/colours';

import navigationDestinations from '../../values/appbar/navigationDestinations';

import NavigationHeading from './NavigationHeading';

interface Props {
  drawerOpened: boolean;
  onDrawerOpened: (open: boolean) => void;
}

const NavigationDrawer = ({ drawerOpened, onDrawerOpened }: Props) => {
  const intl = useIntl();

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    onDrawerOpened(open);
  };

  return (
    <Drawer anchor="left" open={drawerOpened} onClose={toggleDrawer(false)}>
      <Box
        sx={{ width: 280 }}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <NavigationHeading
          sx={{
            width: '100%',
            padding: 2,
            backgroundColor: NAVIGATION_BLACK,
            color: 'primary.contrastText',
          }}
        />
        <Divider />
        <List disablePadding>
          {navigationDestinations.map(({ path, titleId }) => (
            <ListItem key={`nav-drawer-item-${titleId}`} button component={RouterLink} to={path}>
              <ListItemText primary={intl.formatMessage({ id: titleId })} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default NavigationDrawer;
