import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { useIntl } from 'react-intl';

import { Paper, Step, StepLabel, Stepper } from '@mui/material';

import useAppDispatch from '../../hooks/useAppDispatch';
import useAppSelector from '../../hooks/useAppSelector';

import { clearMediaSource } from '../../store/practice/actions';

import practiceSteps from '../../helpers/practiceSteps';

import PageContainer from '../common/PageContainer';
import PracticeInstructions from './PracticeInstructions';
import PracticeIntroduction from './PracticeIntroduction';
import PracticeSettings from './PracticeSettings';
import MediaPlaybackView from './media/MediaPlaybackView';
import MediaZone from './media/MediaZone';

const PracticeGround = () => {
  const source = useAppSelector(state => state.practiceReducer.source);
  const dispatch = useAppDispatch();

  const intl = useIntl();

  const [step, setStep] = useState<number>(0);

  const visitNextStep = () => {
    switch (step) {
      case 0:
        return <PracticeIntroduction onNext={() => setStep(step + 1)} />;
      case 1:
        return (
          <PracticeSettings onBack={() => setStep(step - 1)} onNext={() => setStep(step + 1)} />
        );
      case 2:
        return (
          <PracticeInstructions
            onBack={() => setStep(step - 1)}
            onNext={() => {
              clearMediaSource()(dispatch);
              setStep(step + 1);
            }}
          />
        );
      case 3:
        return <MediaZone onBack={() => setStep(step - 1)} onNext={() => setStep(step + 1)} />;
      case 4:
        return <MediaPlaybackView src={source} />;
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
