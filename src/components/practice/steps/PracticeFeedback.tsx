import { useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';

import { Button, ButtonGroup, Stack, Typography } from '@mui/material';

import { PROGRESS_PATH } from 'strings/paths';

const PracticeFeedback = () => {
  const intl = useIntl();
  const navigate = useNavigate();

  return (
    <ButtonGroup
      fullWidth
      sx={{
        '& > *': { height: 496 },
        '& .MuiButton-root': { textTransform: 'none' },
      }}
    >
      <Button onClick={() => navigate(PROGRESS_PATH)}>
        <Stack>
          <Typography sx={{ fontSize: 60, mb: 4 }}>
            {intl.formatMessage({ id: 'practice.end.interview' })}
          </Typography>
          <Typography>{intl.formatMessage({ id: 'practice.end.description' })}</Typography>
        </Stack>
      </Button>
    </ButtonGroup>
  );
};

export default PracticeFeedback;
