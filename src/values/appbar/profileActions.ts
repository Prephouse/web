import { MouseEvent as ReactMouseEvent } from 'react';

import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import { logOut } from 'services/firebase';

import { HOME_PATH, USER_SIGN_IN_PATH, USER_SIGN_UP_PATH } from 'strings/paths';

interface ProfileAction {
  readonly nameId: string;
  readonly icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
  readonly to: string;
  readonly loggedIn: boolean;
  readonly onClick?: (event: ReactMouseEvent<HTMLLIElement, MouseEvent>) => void;
}

const actions: readonly ProfileAction[] = [
  {
    nameId: 'user.signin',
    icon: LoginIcon,
    to: USER_SIGN_IN_PATH,
    loggedIn: false,
  },
  {
    nameId: 'user.signup',
    icon: AppRegistrationIcon,
    to: USER_SIGN_UP_PATH,
    loggedIn: false,
  },
  {
    nameId: 'user.signout',
    icon: LogoutIcon,
    to: HOME_PATH,
    onClick: () => logOut(),
    loggedIn: true,
  },
];

export default actions;
