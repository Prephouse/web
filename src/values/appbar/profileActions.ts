import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import LoginIcon from '@mui/icons-material/Login';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import { SUPPORT_PATH, USER_SIGN_IN_PATH, USER_SIGN_UP_PATH } from '../../strings/paths';

type ProfileAction = {
  readonly nameId: string;
  readonly icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
  readonly to: string;
};

const actions: readonly ProfileAction[] = [
  {
    nameId: 'user.signin',
    icon: LoginIcon,
    to: USER_SIGN_IN_PATH,
  },
  {
    nameId: 'user.signup',
    icon: AppRegistrationIcon,
    to: USER_SIGN_UP_PATH,
  },
  {
    nameId: 'support.support',
    icon: HelpCenterIcon,
    to: SUPPORT_PATH,
  },
];

export default actions;
