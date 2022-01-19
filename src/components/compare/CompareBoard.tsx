import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';

import PageContainer from '../common/PageContainer';

const CompareBoard = () => {
  const intl = useIntl();

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'compare.title' })} />
      <PageContainer />
    </>
  );
};

export default CompareBoard;
