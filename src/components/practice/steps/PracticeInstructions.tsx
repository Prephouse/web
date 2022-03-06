import { useIntl } from 'react-intl';

import { Box, Typography } from '@mui/material';

import FormButtons from 'components/common/form/FormButtons';

import useAppSelector from 'hooks/useAppSelector';

import { useGetUploadInstructionsQuery } from 'services/prephouse';

import { parseHtml } from 'utils/string';

interface Props {
  onNext: () => void;
  onBack: () => void;
}

const PracticeInstructions = ({ onNext, onBack }: Props) => {
  const sessionType = useAppSelector(state => state.practice.sessionType);
  const medium = useAppSelector(state => state.practice.medium);
  const origin = useAppSelector(state => state.practice.origin);

  const intl = useIntl();

  const { data: instructions } = useGetUploadInstructionsQuery({
    category: sessionType,
    medium,
    origin,
  });

  return (
    <>
      <Box sx={{ my: 3 }}>
        <Typography paragraph>{parseHtml(instructions?.overview)}</Typography>
        <Typography paragraph>{parseHtml(instructions?.preAnalysis)}</Typography>
        <Typography component="ul" gutterBottom>
          {instructions?.feedbackCategories.map(v => (
            <li key={v}>{v}</li>
          ))}
        </Typography>
        <Typography paragraph>{parseHtml(instructions?.postAnalysis)}</Typography>
        <Typography paragraph>{parseHtml(instructions?.confirmation)}</Typography>
      </Box>
      <FormButtons
        primaryText={intl.formatMessage({ id: 'practice.instructions.confirm' })}
        onPrimaryClick={onNext}
        secondaryText={intl.formatMessage({ id: 'practice.instructions.back' })}
        onSecondaryClick={onBack}
      />
    </>
  );
};

export default PracticeInstructions;
