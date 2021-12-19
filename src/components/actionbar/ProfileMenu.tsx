import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import { Divider, Switch, styled } from '@mui/material';

import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';

import { changePrefersDarkMode } from '../../store/preferences/actions';

import profileActions from '../../values/actionbar/profileActions';

import DropdownMenuItem from '../common/DropdownMenuItem';

const Neon = styled('div')((props: Record<'lightUp', boolean>) => {
  if (props.lightUp) {
    return {
      '@media (prefers-reduced-motion: no-preference)': {
        textShadow:
          '0 0 2px, 0 0 1em #4444ff, 0 0 0.5em #4444ff, 0 0 0.1em #4444ff, 0 8px 4px #000',
        '& > span': {
          animation: 'blink linear infinite 3s',
        },
        '& > span:first-of-type': {
          animation: 'blink linear infinite 5s',
        },
        '& > span:nth-of-type(3n + 1)': {
          animation: 'blink linear infinite 4s',
        },
        '& > span:nth-last-of-type(even)': {
          animation: 'blink linear infinite 6s',
        },
      },
    };
  }

  return {};
});

const ProfileMenu = () => {
  const prefersDarkMode: boolean = useAppSelector(state => state.settingsReducer.prefersDarkMode);
  const dispatch = useAppDispatch();

  const intl = useIntl();

  return (
    <>
      {profileActions.map(({ primaryNameId, icon: Icon, to }) => (
        <DropdownMenuItem
          key={`action-menu-item-${primaryNameId}`}
          button
          component={RouterLink}
          to={to}
          primary={intl.formatMessage({ id: primaryNameId })}
          icon={<Icon />}
        />
      ))}
      <Divider />
      <DropdownMenuItem
        primary={
          <Neon lightUp={prefersDarkMode}>
            {[...intl.formatMessage({ id: 'app.setting.darkMode' })].map(c => (
              <span key={`neon-char-${c}-${c + 1}`}>{c}</span>
            ))}
          </Neon>
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
