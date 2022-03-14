import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

import LogoutIcon from '@mui/icons-material/Logout';
import { Divider } from '@mui/material';

import PreferenceDropdownMenu from 'components/appbar/preference/PreferenceDropdownMenu';
import DropdownMenuItem from 'components/common/menu/DropdownMenuItem';

import { logOut } from 'services/firebase';

import { HOME_PATH } from 'strings/paths';

interface Props {
  onSwitchMenu: (nextMenu: string) => void;
}

const ProfileDropdownMenu = ({ onSwitchMenu }: Props) => {
  const intl = useIntl();

  return (
    <>
      <DropdownMenuItem
        component={RouterLink}
        to={HOME_PATH}
        primary={intl.formatMessage({ id: 'user.signout' })}
        icon={<LogoutIcon />}
        onClick={() => logOut()}
      />
      <Divider />
      <PreferenceDropdownMenu onSwitchMenu={onSwitchMenu} />
    </>
  );
};

export default ProfileDropdownMenu;
