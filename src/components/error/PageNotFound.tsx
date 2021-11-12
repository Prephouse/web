import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

import { Link, Typography } from '@mui/material';

import * as paths from '../../strings/paths';

import { findClosestPathname } from '../../utils/string-utils';

import PageContainer from '../common/PageContainer';

const PageNotFound = () => {
  const intl = useIntl();

  const [closestPathname, setClosestPathname] = useState<string | null>(null);

  useEffect(() => findClosestPathname(paths, setClosestPathname), []);

  return (
    <PageContainer>
      <Helmet>
        <title>{intl.formatMessage({ id: 'app.http.404' })} &ndash; Prephouse</title>
      </Helmet>
      <Typography component="h2" variant="h3" gutterBottom>
        &#128533; {intl.formatMessage({ id: 'app.http.404' })}
      </Typography>
      <Typography variant="body1">
        {closestPathname && (
          <>
            <br />
            {intl.formatMessage(
              { id: 'app.http.404.redirect' },
              {
                url: (
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

export default PageNotFound;
