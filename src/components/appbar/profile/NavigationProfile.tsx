import { SetStateAction, useState } from 'react';
import { useIntl } from 'react-intl';

import { Button, IconButton, Typography } from '@mui/material';

import NavigationDropdownMenu from 'components/appbar/profile/NavigationDropdownMenu';
import LanguageDropdownMenu from 'components/appbar/profile/language/LanguageDropdownMenu';
import UserAvatar from 'components/common/UserAvatar';
import DropdownMenu from 'components/common/menu/DropdownMenu';

import useAppSelector from 'hooks/useAppSelector';

import { NAVIGATION_HOVER_GREY } from 'styles/colours';

const NavigationProfile = () => {
  const user = useAppSelector(state => state.auth.user);
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
          startIcon: {
            margin: 0,
          },
        }}
        startIcon={<UserAvatar />}
        onClick={handleOpenMenu}
        aria-haspopup="true"
      >
        <Typography
          sx={{
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
          }}
        >
          {user?.displayName || intl.formatMessage({ id: 'user' })}
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
        aria-label={intl.formatMessage({ id: 'app.navigation.dropdown.open' })}
      >
        <UserAvatar />
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
