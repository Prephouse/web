import { createAction } from '@reduxjs/toolkit';

import { InterviewType, SessionMedium, SessionOrigin } from './enums';

export const setPracticeSettings = createAction(
  'practice/setPracticeSettings',
  (medium: SessionMedium, origin: SessionOrigin, interviewType: InterviewType) => ({
    payload: {
      medium,
      origin,
      interviewType,
    },
  })
);

export const setMediaSource = createAction<string>('practice/setMediaSource');

export const clearMediaSource = createAction<void>('practice/clearMediaSource');
