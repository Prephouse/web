import { Button, ButtonGroup, Typography } from '@mui/material';

interface Props {
  onNext: () => void;
}

const PracticeIntroduction = ({ onNext }: Props) => {
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
        <Typography>Interview</Typography>
      </Button>
    </ButtonGroup>
  );
};

export default PracticeIntroduction;
