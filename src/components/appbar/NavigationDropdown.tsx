import { SetStateAction, useState } from 'react';
import { useIntl } from 'react-intl';

import { Avatar, Button, IconButton, Typography, useTheme } from '@mui/material';

import { NAVIGATION_HOVER_GREY } from '../../styles/colours';

import DropdownMenu from '../common/DropdownMenu';
import NavigationDropdownMenu from './NavigationDropdownMenu';

const NavigationDropdown = () => {
  const theme = useTheme();

  const intl = useIntl();

  const [anchorElMenu, setAnchorElMenu] = useState<HTMLElement | null>(null);
  const handleOpenMenu = (event: { currentTarget: SetStateAction<HTMLElement | null> }) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };

  const ScaledAvatar = (
    <Avatar
      sx={{
        width: 32,
        height: 32,
      }}
      alt="Chandler Lei"
    />
  );

  return (
    <nav aria-label={intl.formatMessage({ id: 'app.navigation.dropdown' })}>
      <Button
        sx={{
          borderRadius: theme.spacing(3),
          textTransform: 'none',
          textDecoration: 'none',
          color: theme.palette.common.white,
          display: 'none',
          '&:hover': {
            backgroundColor: NAVIGATION_HOVER_GREY,
          },
          [theme.breakpoints.up('md')]: {
            display: 'flex',
          },
        }}
        startIcon={ScaledAvatar}
        onClick={handleOpenMenu}
        aria-haspopup="true"
      >
        <Typography
          sx={{
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          Chandler Lei
        </Typography>
      </Button>
      <IconButton
        sx={{
          color: theme.palette.common.white,
          display: 'none',
          '&:hover': {
            backgroundColor: NAVIGATION_HOVER_GREY,
          },
        }}
        onClick={handleOpenMenu}
        aria-haspopup="true"
        size="large"
      >
        {ScaledAvatar}
      </IconButton>
      <DropdownMenu
        id="primary-nav-menu"
        sx={{ minWidth: 256 }}
        open={Boolean(anchorElMenu)}
        anchorEl={anchorElMenu}
        onClose={handleCloseMenu}
      >
        <NavigationDropdownMenu />
      </DropdownMenu>
    </nav>
  );
};

export default NavigationDropdown;
