import { SetStateAction, useState } from 'react';
import { useIntl } from 'react-intl';

import SettingsIcon from '@mui/icons-material/Settings';
import { IconButton, SxProps } from '@mui/material';

import MenuManager from 'components/appbar/MenuManager';
import PreferenceDropdownMenu from 'components/appbar/preference/PreferenceDropdownMenu';
import LanguageDropdownMenu from 'components/appbar/preference/language/LanguageDropdownMenu';
import DropdownMenu from 'components/common/menu/DropdownMenu';

import { NAVIGATION_HOVER_GREY } from 'styles/colours';

interface Props {
  sx?: SxProps;
}

const NavigationPreference = ({ sx }: Props) => {
  const intl = useIntl();

  const [anchorElMenu, setAnchorElMenu] = useState<HTMLElement | null>(null);
  const handleOpenMenu = (event: { currentTarget: SetStateAction<HTMLElement | null> }) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorElMenu(null);
  };

  return (
    <nav aria-label={intl.formatMessage({ id: 'app.navigation.dropdown' })}>
      <IconButton
        sx={{
          borderRadius: 3,
          '&:hover': {
            backgroundColor: NAVIGATION_HOVER_GREY,
          },
          ...sx,
        }}
        color="inherit"
        onClick={handleOpenMenu}
        aria-haspopup="true"
      >
        <SettingsIcon />
      </IconButton>
      <DropdownMenu
        id="preference-nav-menu"
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
        <MenuManager
          menus={{
            _default: PreferenceDropdownMenu,
            language: LanguageDropdownMenu,
          }}
        />
      </DropdownMenu>
    </nav>
  );
};

export default NavigationPreference;
