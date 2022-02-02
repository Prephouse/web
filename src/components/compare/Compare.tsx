import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';

import PageContainer from 'components/common/container/PageContainer';

const Compare = () => {
  const intl = useIntl();

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'compare.title' })} />
      <PageContainer />
    </>
  );
};

export default Compare;
