import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import { Switch } from '@mui/material';

import DarkModeNeon from 'components/appbar/preference/DarkModeNeon';
import DropdownMenuItem from 'components/common/menu/DropdownMenuItem';

import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';

import { changePrefersDarkMode } from 'states/preference/actions';

import { SUPPORT_PATH } from 'strings/paths';

interface Props {
  onSwitchMenu: (nextMenu: string) => void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const PreferenceDropdownMenu = ({ onSwitchMenu }: Props) => {
  const prefersDarkMode = useAppSelector(state => state.preference.prefersDarkMode);
  const dispatch = useAppDispatch();

  const intl = useIntl();

  return (
    <>
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
        button
        component={RouterLink}
        to={SUPPORT_PATH}
        primary={intl.formatMessage({ id: 'support.support' })}
        icon={<HelpCenterIcon />}
      />
    </>
  );
};

export default PreferenceDropdownMenu;
