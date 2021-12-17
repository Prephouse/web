import { Fragment, memo } from 'react';
import { useIntl } from 'react-intl';
import zxcvbn from 'zxcvbn';

import { Typography } from '@mui/material';

import { getPasswordValidators } from '../../../utils/validators';

import badPasswords from '../../../values/user/badPasswords';

import IconicText from '../../common/IconicText';
import SuccessIndicatorIcon from '../../common/SuccessIndicatorIcon';

interface Props {
  password: string;
}

const PasswordStrengthIndicator = ({ password }: Props) => {
  const intl = useIntl();

  const passwordScoreToTextual = (score: number) =>
    intl.formatMessage({ id: `user.registration.password.strength.${score}` });

  const score = zxcvbn(password, badPasswords)?.score;

  return (
    <Typography
      component="div"
      variant="body2"
      align="left"
      sx={{
        padding: 2,
      }}
    >
      <meter
        value={score}
        min={0}
        max={4}
        low={2}
        high={3}
        optimum={4}
        style={{ width: '100%' }}
        aria-valuetext={passwordScoreToTextual(score)}
      />
      <div id="password-strength">
        <strong>{passwordScoreToTextual(score)}</strong>
      </div>
      <br />
      {intl.formatMessage({ id: 'user.registration.password.requirement' })}
      <br />
      {getPasswordValidators().map(({ id, validator }) => (
        <Fragment key={`password-requirement-${id}`}>
          <IconicText
            text={intl.formatMessage({ id })}
            icon={<SuccessIndicatorIcon success={validator(password)} />}
          />
        </Fragment>
      ))}
    </Typography>
  );
};

export default memo(PasswordStrengthIndicator);
