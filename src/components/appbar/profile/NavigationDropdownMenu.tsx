import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import LanguageIcon from '@mui/icons-material/Language';
import { Divider, Switch } from '@mui/material';

import DarkModeNeon from 'components/appbar/profile/DarkModeNeon';
import DropdownMenuItem from 'components/common/menu/DropdownMenuItem';

import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';

import { changePrefersDarkMode } from 'states/preference/actions';

import { SUPPORT_PATH } from 'strings/paths';

import profileActions from 'values/appbar/profileActions';

interface Props {
  onSwitchMenu: (nextMenu: string) => void;
}

const NavigationDropdownMenu = ({ onSwitchMenu }: Props) => {
  const user = useAppSelector(state => state.auth.user);
  const prefersDarkMode = useAppSelector(state => state.preference.prefersDarkMode);
  const dispatch = useAppDispatch();

  const intl = useIntl();

  return (
    <>
      {profileActions.map(({ nameId, icon: Icon, to, loggedIn, onClick }) =>
        loggedIn === !!user ? (
          <DropdownMenuItem
            key={`action-menu-item-${nameId}`}
            component={RouterLink}
            to={to}
            primary={intl.formatMessage({ id: nameId })}
            icon={<Icon />}
            onClick={onClick}
          />
        ) : null
      )}
      <Divider />
      <DropdownMenuItem
        primary={<DarkModeNeon prefersDarkMode={prefersDarkMode} />}
        icon={<Brightness4Icon />}
      >
        <Switch
          name="dark-mode-switch"
          checked={prefersDarkMode}
          onChange={() => dispatch(changePrefersDarkMode(!prefersDarkMode))}
          inputProps={{
            role: 'switch',
          }}
        />
      </DropdownMenuItem>
      <DropdownMenuItem
        primary={intl.formatMessage({ id: 'app.preference.language' })}
        icon={<LanguageIcon />}
        onClick={() => onSwitchMenu('language')}
      >
        <ChevronRightIcon />
      </DropdownMenuItem>
      <DropdownMenuItem
        button
        component={RouterLink}
        to={SUPPORT_PATH}
        primary={intl.formatMessage({ id: 'support.support' })}
        icon={<HelpCenterIcon />}
      />
    </>
  );
};

export default NavigationDropdownMenu;
