import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

import { Button, ButtonGroup } from '@mui/material';

import { USER_SIGN_IN_PATH, USER_SIGN_UP_PATH } from 'strings/paths';

import { BLUE_500 } from 'styles/colours';

const ProfileButtons = () => {
  const intl = useIntl();

  return (
    <ButtonGroup variant="contained">
      <Button
        sx={{
          color: 'common.white',
          backgroundColor: BLUE_500,
          textTransform: 'none',
          textOverflow: 'nowrap',
          whiteSpace: 'nowrap',
        }}
        color="info"
        component={RouterLink}
        to={USER_SIGN_IN_PATH}
      >
        {intl.formatMessage({ id: 'user.signin' })}
      </Button>
      <Button
        sx={{
          color: 'common.white',
          borderColor: BLUE_500,
          textTransform: 'none',
          textOverflow: 'nowrap',
          whiteSpace: 'nowrap',
        }}
        variant="outlined"
        component={RouterLink}
        to={USER_SIGN_UP_PATH}
      >
        {intl.formatMessage({ id: 'user.signup' })}
      </Button>
    </ButtonGroup>
  );
};

export default ProfileButtons;
