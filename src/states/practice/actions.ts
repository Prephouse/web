import { createAction } from '@reduxjs/toolkit';

import { SessionMedium, SessionOrigin } from './enums';

export const setPracticeSettings = createAction(
  'practice/setPracticeSettings',
  (medium: SessionMedium, origin: SessionOrigin) => ({
    payload: {
      medium,
      origin,
    },
  })
);

export const setMediaSource = createAction<string>('practice/setMediaSource');

export const clearMediaSource = createAction<void>('practice/clearMediaSource');
