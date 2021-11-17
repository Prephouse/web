import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

import { Link, Typography } from '@mui/material';

import * as paths from '../../strings/paths';

import { findClosestPathname } from '../../utils/stringUtils';

import PageContainer from '../common/PageContainer';

const PageNotFoundView = () => {
  const intl = useIntl();

  const [closestPathname, setClosestPathname] = useState<string | null>(null);

  useEffect(() => findClosestPathname(paths, setClosestPathname), []);

  return (
    <PageContainer>
      <Helmet>
        <title>{intl.formatMessage({ id: 'common.http.404' })} &ndash; Prephouse</title>
      </Helmet>
      <Typography component="h2" variant="h3" gutterBottom>
        <span role="img" aria-label={intl.formatMessage({ id: 'common.emotion.annoyed' })}>
          &#128533;
        </span>{' '}
        {intl.formatMessage({ id: 'common.http.404' })}
      </Typography>
      <Typography variant="body1">
        {closestPathname && (
          <>
            <br />
            {intl.formatMessage(
              { id: 'common.http.404.redirect' },
              {
                url: (
                  // eslint-disable-next-line @shopify/jsx-no-hardcoded-content
                  <Link
                    key={`redirect-suggestion-${closestPathname}`}
                    component={RouterLink}
                    to={closestPathname}
                  >
                    {`${window.location.protocol}//${window.location.host}${closestPathname}`}
                  </Link>
                ),
              }
            )}
          </>
        )}
      </Typography>
    </PageContainer>
  );
};

export default PageNotFoundView;
