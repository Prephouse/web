import { createReducer } from '@reduxjs/toolkit';

import { setPracticeSettings } from './actions';
import { SessionMedium, SessionOrigin, SessionType } from './enums';

interface PracticeReduxState {
  sessionType: SessionType;
  medium: SessionMedium;
  origin: SessionOrigin;
}

const initState: PracticeReduxState = {
  sessionType: SessionType.Interview,
  medium: SessionMedium.VideoAudio,
  origin: SessionOrigin.Record,
};

const practiceReducer = createReducer(initState, builder => {
  builder.addCase(setPracticeSettings, (state, action) => {
    state.medium = action.payload.medium;
    state.origin = action.payload.origin;
    state.sessionType = action.payload.sessionType;
  });
});

export default practiceReducer;
