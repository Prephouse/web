import { ReactElement } from 'react';

import {
  Favorite as FavoriteIcon,
  GraphicEq as GraphicEqIcon,
  PauseCircle as PauseCircleIcon,
  Textsms as TextsmsIcon,
  TipsAndUpdates as TipsAndUpdatesIcon,
  Visibility as VisibilityIcon,
  VolumeUp as VolumeUpIcon,
} from '@mui/icons-material';
import { Grid, Paper, Stack, Typography } from '@mui/material';

import { SessionResponseSchema } from 'schemas/session/sessionSchema';

import {
  BLUE_500,
  CYAN_500,
  GREEN_500,
  INDIGO_500,
  ORANGE_500,
  RED_500,
  YELLOW_500,
} from 'styles/colours';

const Icons: { [key: string]: ReactElement } = {
  Emotion: <FavoriteIcon sx={{ color: RED_500 }} />,
  'Background Light': <TipsAndUpdatesIcon sx={{ color: YELLOW_500 }} />,
  Volume: <VolumeUpIcon sx={{ color: GREEN_500 }} />,
  'Gaze Direction': <VisibilityIcon sx={{ color: BLUE_500 }} />,
  'Filler Words': <TextsmsIcon sx={{ color: ORANGE_500 }} />,
  Pitch: <GraphicEqIcon sx={{ color: CYAN_500 }} />,
  'Silent Pauses': <PauseCircleIcon sx={{ color: INDIGO_500 }} />,
};

const TextFeedback = ({
  textFeedback,
}: {
  textFeedback: SessionResponseSchema['textFeedback'] | undefined;
}) => (
  <Grid container spacing={2}>
    {textFeedback?.map(feedback => (
      <Grid item xs={12} sm={6} lg={4}>
        <Paper elevation={2} sx={{ p: 2, height: '100%' }}>
          <Stack direction="row" sx={{ alignItems: 'baseline', justifyContent: 'space-between' }}>
            <Typography component="h6" variant="h6" sx={{ mb: 2 }}>
              {feedback.category}
            </Typography>
            {Icons[feedback.category]}
          </Stack>
          {`${feedback.comment}`}
        </Paper>
      </Grid>
    ))}
  </Grid>
);

export default TextFeedback;
