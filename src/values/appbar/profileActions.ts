import HowToRegIcon from '@mui/icons-material/HowToReg';
import PersonIcon from '@mui/icons-material/Person';
import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

import { USER_SIGN_IN_PATH, USER_SIGN_UP_PATH } from '../../strings/paths';

type ProfileAction = {
  readonly nameId: string;
  readonly icon: OverridableComponent<SvgIconTypeMap> & { muiName: string };
  readonly to: string;
};

const actions: readonly ProfileAction[] = [
  {
    nameId: 'user.signin',
    icon: PersonIcon,
    to: USER_SIGN_IN_PATH,
  },
  {
    nameId: 'user.signup',
    icon: HowToRegIcon,
    to: USER_SIGN_UP_PATH,
  },
];

export default actions;
