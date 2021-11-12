import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

import { Paper, Step, StepLabel, Stepper } from '@mui/material';

import { Medium } from '../../utils/enums';

import practiceSteps from '../../helpers/practice-steps';

import PageContainer from '../common/PageContainer';
import MediaUploadZone from './MediaUploadZone';
import PracticeInstructions from './PracticeInstructions';
import PracticeSettings from './PracticeSettings';

const PracticeGround = () => {
  const intl = useIntl();

  const [step, setStep] = useState<number>(0);

  const visitNextStep = () => {
    switch (step) {
      case 0:
        return <PracticeSettings onNext={() => setStep(step + 1)} />;
      case 1:
        return <PracticeInstructions onNext={() => setStep(step + 1)} />;
      case 2:
        return <MediaUploadZone medium={Medium.VIDEO_AND_AUDIO} />;
      default:
        return <></>;
    }
  };

  return (
    <>
      <Helmet>
        <title>{intl.formatMessage({ id: 'practice.title.expanded' })}</title>
      </Helmet>
      <PageContainer>
        <Paper
          elevation={3}
          sx={{
            width: '100%',
            margin: theme => theme.spacing(3, 0),
            padding: theme => theme.spacing(3),
          }}
        >
          <Stepper activeStep={step} alternativeLabel>
            {practiceSteps.map(labelId => (
              <Step key={labelId}>
                <StepLabel>{intl.formatMessage({ id: labelId })}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Paper>
        {visitNextStep()}
      </PageContainer>
    </>
  );
};

export default PracticeGround;
