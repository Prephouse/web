import HowToRegIcon from '@mui/icons-material/HowToReg';
import PersonIcon from '@mui/icons-material/Person';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import { USER_REGISTRATION_PATH, USER_SIGN_IN_PATH } from '../strings/paths';

type ProfileAction = {
  readonly primaryNameId: string;
  readonly icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
  readonly to: string;
};

const actions: readonly ProfileAction[] = Object.freeze([
  {
    primaryNameId: 'user.sign-in.action',
    icon: PersonIcon,
    to: USER_SIGN_IN_PATH,
  },
  {
    primaryNameId: 'user.registration.action',
    icon: HowToRegIcon,
    to: USER_REGISTRATION_PATH,
  },
]);

export default actions;
