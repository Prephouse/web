import { useIntl } from 'react-intl';

import { Button, ButtonGroup, Typography } from '@mui/material';

interface Props {
  onNext: () => void;
}

const PracticeIntroduction = ({ onNext }: Props) => {
  const intl = useIntl();

  return (
    <ButtonGroup
      fullWidth
      sx={{
        '& > *': { height: 496 },
        '& .MuiButton-root': { textTransform: 'none' },
        '& .MuiTypography-root': { fontSize: 60 },
      }}
    >
      <Button onClick={onNext}>
        <Typography>{intl.formatMessage({ id: 'practice.start.interview' })}</Typography>
      </Button>
    </ButtonGroup>
  );
};

export default PracticeIntroduction;
