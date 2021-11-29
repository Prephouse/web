import { Fragment, memo } from 'react';
import { useIntl } from 'react-intl';
import zxcvbn from 'zxcvbn';

import { Typography } from '@mui/material';

import badPasswords from '../../../helpers/badPasswords';
import { retrievePasswordRequirements } from '../../../helpers/userRegistrationHelper';

import IconicText from '../../common/IconicText';
import SuccessIndicatorIcon from '../../common/SuccessIndicatorIcon';

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
      {retrievePasswordRequirements(password).map(requirement => (
        <Fragment key={`password-requirement-${requirement.failTextId}`}>
          <IconicText
            text={intl.formatMessage({ id: requirement.failTextId })}
            icon={<SuccessIndicatorIcon success={requirement.passed} />}
          />
        </Fragment>
      ))}
    </Typography>
  );
};

export default memo(PasswordStrengthIndicator);
