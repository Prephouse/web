import React from 'react';
import { useIntl } from 'react-intl';
import zxcvbn from 'zxcvbn';
import { retrievePasswordRequirements } from './registration-form-helper';
import badPasswords from './bad-passwords';
import { Typography } from '@mui/material';
import IconicText from '../../common/IconicText';
import SmallSuccessIndicatorIcon from '../../common/SmallSuccessIndicatorIcon';

interface Props {
  password: string;
}

const PasswordStrengthIndicator = ({ password }: Props) => {
  const intl = useIntl();

  const passwordScoreToTextual = (score: number) => {
    return intl.formatMessage({ id: `user.registration.password.strength.${score}` });
  };

  const score = zxcvbn(password, badPasswords)?.score;

  return (
    <Typography
      component="div"
      variant="body2"
      align="left"
      sx={{
        padding: theme => theme.spacing(2),
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
      {retrievePasswordRequirements(password).map((requirement, index) => (
        <React.Fragment key={`password-requirement-${index}`}>
          <IconicText
            text={intl.formatMessage({ id: requirement.failTextId })}
            icon={<SmallSuccessIndicatorIcon success={requirement.passed} />}
          />
        </React.Fragment>
      ))}
    </Typography>
  );
};

export default PasswordStrengthIndicator;
