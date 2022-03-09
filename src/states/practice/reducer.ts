import { createReducer } from '@reduxjs/toolkit';

import { setPracticeSettings, setQuestionId } from './actions';
import { SessionMedium, SessionOrigin, SessionType } from './enums';

interface PracticeReduxState {
  sessionType: SessionType;
  medium: SessionMedium;
  origin: SessionOrigin;
  questionId: number | null;
}

const initState: PracticeReduxState = {
  sessionType: SessionType.Interview,
  medium: SessionMedium.VideoAudio,
  origin: SessionOrigin.Record,
  questionId: null,
};

const practiceReducer = createReducer(initState, builder => {
  builder.addCase(setPracticeSettings, (state, action) => {
    state.medium = action.payload.medium;
    state.origin = action.payload.origin;
    state.sessionType = action.payload.sessionType;
  });
  builder.addCase(setQuestionId, (state, action) => {
    state.questionId = action.payload.questionId;
  });
});

export default practiceReducer;
