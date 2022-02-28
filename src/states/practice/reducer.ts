import { createReducer } from '@reduxjs/toolkit';

import { clearMediaSource, setMediaSource, setPracticeSettings } from './actions';
import { InterviewType, SessionMedium, SessionOrigin, SessionType } from './enums';

interface PracticeReduxState {
  sessionType: SessionType;
  medium: SessionMedium;
  origin: SessionOrigin;
  allowLiveFeedback: boolean;
  source: string | undefined;
  interviewType: InterviewType;
}

const initState: PracticeReduxState = {
  sessionType: SessionType.Interview,
  medium: SessionMedium.VideoAudio,
  origin: SessionOrigin.Record,
  allowLiveFeedback: true,
  source: undefined,
  interviewType: InterviewType.Session,
};

const practiceReducer = createReducer(initState, builder => {
  builder
    .addCase(setPracticeSettings, (state, action) => {
      state.medium = action.payload.medium;
      state.origin = action.payload.origin;
      state.allowLiveFeedback = action.payload.allowLiveFeedback;
      state.interviewType = action.payload.interviewType;
    })
    .addCase(setMediaSource, (state, action) => {
      state.source = action.payload;
    })
    .addCase(clearMediaSource, state => {
      state.source = undefined;
    });
});

export default practiceReducer;
