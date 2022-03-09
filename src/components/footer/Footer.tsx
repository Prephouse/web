import { memo } from 'react';
import { useIntl } from 'react-intl';

import { Box, Link } from '@mui/material';

import useAppSelector from 'hooks/useAppSelector';

import { NAVIGATION_BLACK } from 'styles/colours';

const Footer = () => {
  const locale = useAppSelector(state => state.preference.locale);

  const intl = useIntl();

  return (
    <Box component="footer" bgcolor={NAVIGATION_BLACK} color="primary.contrastText">
      <p>&copy; {new Date().getFullYear()} Prephouse. All rights reserved.</p>
      <small>
        {intl.formatMessage(
          { id: 'app.recaptcha' },
          {
            pp: (
              <Link href={`https://policies.google.com/privacy?hl=${locale}`} color="inherit">
                {intl.formatMessage({ id: 'app.recaptcha.pp' })}
              </Link>
            ),
            tos: (
              <Link href={`https://policies.google.com/terms?hl=${locale}`} color="inherit">
                {intl.formatMessage({ id: 'app.recaptcha.tos' })}
              </Link>
            ),
          }
        )}
      </small>
    </Box>
  );
};

export default memo(Footer);
