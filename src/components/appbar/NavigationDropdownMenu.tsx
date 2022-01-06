import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LanguageIcon from '@mui/icons-material/Language';
import { Divider, Switch } from '@mui/material';

import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';

import profileActions from '../../values/appbar/profileActions';

import { changePrefersDarkMode } from '../../states/preference/actions';
import DropdownMenuItem from '../common/DropdownMenuItem';
import DarkModeNeon from './DarkModeNeon';

interface Props {
  onSwitchMenu: (nextMenu: string) => void;
}

const NavigationDropdownMenu = ({ onSwitchMenu }: Props) => {
  const prefersDarkMode: boolean = useAppSelector(state => state.preference.prefersDarkMode);
  const dispatch = useAppDispatch();

  const intl = useIntl();

  return (
    <>
      {profileActions.map(({ nameId, icon: Icon, to }) => (
        <DropdownMenuItem
          key={`action-menu-item-${nameId}`}
          button
          component={RouterLink}
          to={to}
          primary={intl.formatMessage({ id: nameId })}
          icon={<Icon />}
        />
      ))}
      <Divider />
      <DropdownMenuItem
        primary={<DarkModeNeon prefersDarkMode={prefersDarkMode} />}
        icon={<Brightness4Icon />}
      >
        <Switch
          name="dark-mode-switch"
          checked={prefersDarkMode}
          onChange={() => changePrefersDarkMode(!prefersDarkMode)(dispatch)}
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
    </>
  );
};

export default NavigationDropdownMenu;
