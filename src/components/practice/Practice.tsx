import { useCallback, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';

import { Paper, Step, StepLabel, Stepper, useMediaQuery, useTheme } from '@mui/material';

import PageContainer from 'components/common/container/PageContainer';
import PracticeFeedback from 'components/practice/steps/PracticeFeedback';
import PracticeInstructions from 'components/practice/steps/PracticeInstructions';
import PracticeIntroduction from 'components/practice/steps/PracticeIntroduction';
import PracticeSettings from 'components/practice/steps/PracticeSettings';
import PracticeUploadRecord from 'components/practice/steps/PracticeUploadRecord';

import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';

import { clearMediaSource } from 'states/practice/actions';

import practiceSteps from 'values/practice/practiceSteps';

const Practice = () => {
  const source = useAppSelector(state => state.practice.source);
  const dispatch = useAppDispatch();

  const [step, setStep] = useState<number>(0);
  const goToNextStep = useCallback(() => setStep(step + 1), [step]);
  const goToPreviousStep = useCallback(() => setStep(step - 1), [step]);
  const clearMediaWithNextStep = useCallback(() => {
    dispatch(clearMediaSource());
    setStep(step + 1);
  }, [dispatch, step]);

  const theme = useTheme();
  const showHorizontalStepper = useMediaQuery(theme.breakpoints.up('sm'));

  const intl = useIntl();

  const visitNextStep = () => {
    switch (step) {
      case 0:
        return <PracticeIntroduction onNext={goToNextStep} />;
      case 1:
        return <PracticeSettings onBack={goToPreviousStep} onNext={goToNextStep} />;
      case 2:
        return <PracticeInstructions onBack={goToPreviousStep} onNext={clearMediaWithNextStep} />;
      case 3:
        return <PracticeUploadRecord onBack={goToPreviousStep} onNext={goToNextStep} />;
      case 4:
        return <PracticeFeedback src={source} />;
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet title={intl.formatMessage({ id: 'practice.title.expanded' })} />
      <PageContainer>
        <Paper
          elevation={3}
          sx={{
            width: '100%',
            padding: 3,
          }}
        >
          <Stepper
            activeStep={step}
            alternativeLabel={showHorizontalStepper}
            orientation={showHorizontalStepper ? 'horizontal' : 'vertical'}
          >
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

export default Practice;
