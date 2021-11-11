import { useIntl } from "react-intl";
import { Helmet } from "react-helmet";
import PageContainer from "../components/common/PageContainer";

const CompareBoard = () => {
  const intl = useIntl();

  return (
    <>
      <Helmet>
        <title>{intl.formatMessage({ id: "compare.title" })}</title>
      </Helmet>
      <PageContainer>

      </PageContainer>
    </>
  )
};

export default CompareBoard;
