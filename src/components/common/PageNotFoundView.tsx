import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';
import { Link as RouterLink } from 'react-router-dom';

import { Link, Typography } from '@mui/material';

import PageContainer from 'components/common/container/PageContainer';

import * as paths from 'strings/paths';

import { findClosestPathname } from 'utils/string';

const PageNotFoundView = () => {
  const intl = useIntl();

  const [closestPathname, setClosestPathname] = useState<string | undefined>();

  useEffect(() => findClosestPathname(window.location.pathname, paths, setClosestPathname), []);

  return (
    <>
      <Helmet>
        <title>{intl.formatMessage({ id: 'common.http.404' })} &ndash; Prephouse</title>
      </Helmet>
      <PageContainer>
        <Typography component="h2" variant="h3" gutterBottom>
          <span role="img" aria-label={intl.formatMessage({ id: 'common.emotion.annoyed' })}>
            &#128533;
          </span>
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
    </>
  );
};

export default PageNotFoundView;
