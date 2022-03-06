import { useCallback, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Helmet } from 'react-helmet-async';
import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { Paper, Step, StepLabel, Stepper, useMediaQuery, useTheme } from '@mui/material';

import PageContainer from 'components/common/container/PageContainer';
import ConfirmationDialog from 'components/common/dialog/ConfirmationDialog';
import ErrorDialog from 'components/practice/ErrorDialog';
import PracticeFeedback from 'components/practice/steps/PracticeFeedback';
import PracticeInstructions from 'components/practice/steps/PracticeInstructions';
import PracticeIntroduction from 'components/practice/steps/PracticeIntroduction';
import PracticeSettings from 'components/practice/steps/PracticeSettings';
import PracticeUploadRecord from 'components/practice/steps/PracticeUploadRecord';

import useAppDispatch from 'hooks/useAppDispatch';
import useAppSelector from 'hooks/useAppSelector';

import rollbar from 'libs/rollbar';

import { clearMediaSource } from 'states/practice/actions';
import { SessionOrigin } from 'states/practice/enums';

import { HOME_PATH } from 'strings/paths';

import practiceSteps from 'values/practice/practiceSteps';

const Practice = () => {
  const source = useAppSelector(state => state.practice.source);
  const origin = useAppSelector(state => state.practice.origin);
  const dispatch = useAppDispatch();

  const [blockSession, setBlockSession] = useState<boolean | null>(() => false);
  const [step, setStep] = useState(0);

  const goToNextStep = useCallback(() => setStep(step + 1), [step]);
  const goToPreviousStep = useCallback(() => setStep(step - 1), [step]);
  const clearMediaWithNextStep = useCallback(() => {
    dispatch(clearMediaSource());
    setStep(step + 1);
  }, [dispatch, step]);

  const navigate = useNavigate();

  const theme = useTheme();
  const showHorizontalStepper = useMediaQuery(theme.breakpoints.up('sm'));

  const intl = useIntl();

  useEffect(() => {
    let currPriority = 0;
    let maxPriority = 0;
    const bc = new BroadcastChannel('practice');
    bc.postMessage({ action: 'opened' });
    bc.onmessage = event => {
      switch (event.data.action) {
        case 'opened':
          currPriority += 1;
          bc.postMessage({ action: 'present', currPriority });
          setBlockSession(
            value =>
              value !== null &&
              origin !== SessionOrigin.Upload &&
              currPriority < maxPriority &&
              step === 2
          );
          break;
        case 'present':
          maxPriority = Math.max(event.data?.currPriority ?? 0, maxPriority);
          setBlockSession(
            value =>
              value !== null &&
              origin !== SessionOrigin.Upload &&
              currPriority < maxPriority &&
              step === 2
          );
          break;
        case 'closed':
          currPriority = 0;
          bc.postMessage({ action: 'present', currPriority });
          break;
        default:
        // no-op
      }
    };
    return () => {
      bc.postMessage({ action: 'closed' });
      bc.close();
    };
  }, [origin, step]);

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
        <ErrorBoundary
          FallbackComponent={ErrorDialog}
          onReset={() => {
            navigate(HOME_PATH);
          }}
          onError={(error, info) => {
            rollbar.error(error, info.componentStack);
          }}
        >
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
        </ErrorBoundary>
      </PageContainer>
      <ConfirmationDialog
        open={blockSession === true}
        dialogContentText={intl.formatMessage({ id: 'practice.practice.redirect' })}
        approveText={intl.formatMessage({ id: 'common.yes' })}
        onApprove={() => {
          setBlockSession(null);
        }}
        rejectText={intl.formatMessage({ id: 'common.no' })}
        onReject={() => {
          setStep(0);
        }}
      />
    </>
  );
};

export default Practice;
