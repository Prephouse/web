import { SetStateAction, useState } from 'react';
import { useIntl } from 'react-intl';

import { Avatar, Button, IconButton, Typography } from '@mui/material';

import LanguageDropdownMenu from 'components/appbar/LanguageDropdownMenu';
import NavigationDropdownMenu from 'components/appbar/NavigationDropdownMenu';
import DropdownMenu from 'components/common/DropdownMenu';

import { NAVIGATION_HOVER_GREY } from 'styles/colours';

const ScaledAvatar = (
  <Avatar
    sx={{
      width: 32,
      height: 32,
    }}
    alt="Chandler Lei"
  />
);

const NavigationProfile = () => {
  const intl = useIntl();

  const [anchorElMenu, setAnchorElMenu] = useState<HTMLElement | null>(null);
  const handleOpenMenu = (event: { currentTarget: SetStateAction<HTMLElement | null> }) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };

  const [selectedMenuName, setSelectedMenuName] = useState<keyof typeof menus>('default');
  const handleSwitchMenu = (newMenuName: string) =>
    setSelectedMenuName(newMenuName as keyof typeof menus);
  const handleMenuBack = () => handleSwitchMenu('default');

  const menus = {
    default: <NavigationDropdownMenu onSwitchMenu={handleSwitchMenu} />,
    language: <LanguageDropdownMenu onMenuBack={handleMenuBack} />,
  };

  return (
    <nav aria-label={intl.formatMessage({ id: 'app.navigation.dropdown' })}>
      <Button
        sx={{
          borderRadius: 3,
          textTransform: 'none',
          textDecoration: 'none',
          color: 'common.white',
          display: {
            xs: 'none',
            md: 'flex',
          },
          '&:hover': {
            backgroundColor: NAVIGATION_HOVER_GREY,
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
          color: 'common.white',
          display: {
            xs: 'flex',
            md: 'none',
          },
          '&:hover': {
            backgroundColor: NAVIGATION_HOVER_GREY,
          },
        }}
        size="large"
        onClick={handleOpenMenu}
        aria-haspopup="true"
        aria-label={intl.formatMessage({ id: 'app.navigation.dropdown.show' })}
      >
        {ScaledAvatar}
      </IconButton>
      <DropdownMenu
        id="primary-nav-menu"
        sx={{
          '& .MuiPaper-root': {
            marginTop: 1,
            minWidth: 256,
          },
        }}
        open={Boolean(anchorElMenu)}
        anchorEl={anchorElMenu}
        onClose={handleCloseMenu}
      >
        {menus[selectedMenuName]}
      </DropdownMenu>
    </nav>
  );
};

export default NavigationProfile;
