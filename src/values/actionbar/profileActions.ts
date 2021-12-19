import HowToRegIcon from '@mui/icons-material/HowToReg';
import PersonIcon from '@mui/icons-material/Person';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import { USER_SIGN_IN_PATH, USER_SIGN_UP_PATH } from '../../strings/paths';

type ProfileAction = {
  readonly primaryNameId: string;
  readonly icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
  readonly to: string;
};

const actions: readonly ProfileAction[] = Object.freeze([
  {
    primaryNameId: 'user.signin.action',
    icon: PersonIcon,
    to: USER_SIGN_IN_PATH,
  },
  {
    primaryNameId: 'user.signup.action',
    icon: HowToRegIcon,
    to: USER_SIGN_UP_PATH,
  },
]);

export default actions;
