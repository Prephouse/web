import { createAction } from '@reduxjs/toolkit';

import { User } from 'firebase/auth';

export type FirebaseUser = Pick<User, 'uid' | 'displayName' | 'photoURL'>;

export const setUser = createAction<FirebaseUser | null>('auth/setUser');
