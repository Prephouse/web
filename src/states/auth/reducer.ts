import { createReducer } from '@reduxjs/toolkit';

import { FirebaseUser, setUser } from 'states/auth/actions';

import { USER_KEY } from 'strings/keys';

interface AuthReduxState {
  user: FirebaseUser | null;
}

const initState: AuthReduxState = {
  user: JSON.parse(localStorage.getItem(USER_KEY) ?? 'null'),
};

const authReducer = createReducer(initState, builder => {
  builder.addCase(setUser, (state, action) => {
    state.user = action.payload;
  });
});

export default authReducer;
