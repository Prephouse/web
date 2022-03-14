import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

import { Button, ButtonGroup, SxProps } from '@mui/material';

import { USER_SIGN_IN_PATH, USER_SIGN_UP_PATH } from 'strings/paths';

import { BLUE_500 } from 'styles/colours';

interface Props {
  sx?: SxProps;
  fullWidth?: boolean;
}

const ProfileButtons = ({ sx, fullWidth = false }: Props) => {
  const intl = useIntl();

  return (
    <ButtonGroup sx={sx} variant="contained" fullWidth={fullWidth}>
      <Button
        sx={{
          color: 'common.white',
          backgroundColor: BLUE_500,
          textTransform: 'none',
          textOverflow: 'nowrap',
          whiteSpace: 'nowrap',
        }}
        color="primary"
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
        color="secondary"
        component={RouterLink}
        to={USER_SIGN_UP_PATH}
      >
        {intl.formatMessage({ id: 'user.signup' })}
      </Button>
    </ButtonGroup>
  );
};

export default ProfileButtons;
