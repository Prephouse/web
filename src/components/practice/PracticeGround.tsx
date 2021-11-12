import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

import { Box, Step, StepLabel, Stepper } from '@mui/material';

import PageContainer from '../common/PageContainer';
import MediaUploadZone from './MediaUploadZone';
import PracticeSettings from './PracticeSettings';
import practiceSteps from './practiceSteps';

const PracticeGround = () => {
  const intl = useIntl();

  return (
    <>
      <Helmet>
        <title>{intl.formatMessage({ id: 'practice.title.expanded' })}</title>
      </Helmet>
      <PageContainer>
        <Box sx={{ width: '100%', margin: theme => theme.spacing(3, 0) }}>
          <Stepper activeStep={0} alternativeLabel>
            {practiceSteps.map(labelId => (
              <Step key={labelId}>
                <StepLabel>{intl.formatMessage({ id: labelId })}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <PracticeSettings />
        <MediaUploadZone />
      </PageContainer>
    </>
  );
};

export default PracticeGround;
