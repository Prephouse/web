import clsx from 'clsx';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import PersonIcon from '@mui/icons-material/Person';
import { Divider, Switch } from '@mui/material';

import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';

import { changePrefersDarkMode } from '../../store/settings/actions';

import { USER_REGISTRATION_PATH, USER_SIGN_IN_PATH } from '../../strings/paths';

import DropdownMenuItem from '../common/DropdownMenuItem';
import './actionbar.css';

const actions = Object.freeze([
  {
    primaryNameId: 'user.sign-in.action',
    icon: <PersonIcon />,
    to: USER_SIGN_IN_PATH,
  },
  {
    primaryNameId: 'user.registration.action',
    icon: <HowToRegIcon />,
    to: USER_REGISTRATION_PATH,
  },
]);

const ProfileMenu = () => {
  const prefersDarkMode: boolean = useAppSelector(state => state.settingsReducer.prefersDarkMode);
  const dispatch = useAppDispatch();

  const intl = useIntl();

  return (
    <>
      {actions.map(({ primaryNameId, icon, to }) => (
        <DropdownMenuItem
          key={`action-menu-item-${primaryNameId}`}
          button
          component={RouterLink}
          to={to}
          primary={intl.formatMessage({ id: primaryNameId })}
          icon={icon}
        />
      ))}
      <Divider />
      <DropdownMenuItem
        primary={
          <div className={clsx(prefersDarkMode && 'neon')}>
            {[...intl.formatMessage({ id: 'app.setting.darkMode' })].map(c => (
              <span key={`neon-char-${c}-${c + 1}`}>{c}</span>
            ))}
          </div>
        }
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
    </>
  );
};

export default ProfileMenu;
