import { memo } from 'react';
import { useIntl } from 'react-intl';
import zxcvbn from 'zxcvbn';

import { Typography } from '@mui/material';

import IconicText from 'components/common/IconicText';
import SuccessIndicatorIcon from 'components/common/SuccessIndicatorIcon';

import {
  validatePasswordMinimumLength,
  validatePasswordNumericality,
  validatePasswordUppercase,
} from 'utils/validators';

import badPasswords from 'values/user/badPasswords';

interface Props {
  password: string;
}

const PasswordStrengthIndicator = ({ password }: Props) => {
  const intl = useIntl();

  const passwordScoreToTextual = (score: number) =>
    intl.formatMessage({ id: `user.signup.password.strength.${score}` });

  const score = zxcvbn(password, badPasswords)?.score;

  return (
    <Typography
      component="div"
      role="status"
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
      <div id="password-strength" data-testid="password-strength">
        <strong>{passwordScoreToTextual(score)}</strong>
      </div>
      <br />
      {intl.formatMessage({ id: 'user.signup.password.requirement' })}
      <br />
      <IconicText
        text={intl.formatMessage({ id: 'user.signup.password.length' })}
        icon={<SuccessIndicatorIcon success={validatePasswordMinimumLength(password)} />}
      />
      <IconicText
        text={intl.formatMessage({ id: 'user.signup.password.oneUpper' })}
        icon={<SuccessIndicatorIcon success={validatePasswordUppercase(password)} />}
      />
      <IconicText
        text={intl.formatMessage({ id: 'user.signup.password.oneNumber' })}
        icon={<SuccessIndicatorIcon success={validatePasswordNumericality(password)} />}
      />
    </Typography>
  );
};

export default memo(PasswordStrengthIndicator);
