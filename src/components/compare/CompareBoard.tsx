import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

import PageContainer from '../common/PageContainer';

const CompareBoard = () => {
  const intl = useIntl();

  return (
    <>
      <Helmet>
        <title>{intl.formatMessage({ id: 'compare.title' })}</title>
      </Helmet>
      <PageContainer />
    </>
  );
};

export default CompareBoard;
