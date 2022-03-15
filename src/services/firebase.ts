import { FirebaseError } from 'firebase/app';
import {
  EmailAuthProvider,
  FacebookAuthProvider,
  GoogleAuthProvider,
  User,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';

type SuccessCallback = () => void;
type ErrorCallback = (code: string, defaultMessage: string) => void;

export enum AuthProvider {
  Google = 'google',
  Facebook = 'facebook',
}

const processFirebaseError = (err: FirebaseError, onError?: ErrorCallback) => {
  if (!['auth/popup-closed-by-user', 'auth/cancelled-popup-request'].includes(err.code)) {
    onError?.(err.code, err.message);
  }
};

export const registerWithEmailAndPassword = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  onSuccess?: SuccessCallback,
  onError?: ErrorCallback
) => {
  try {
    const auth = getAuth();
    const res = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(res.user, {
      displayName: `${firstName} ${lastName}`,
    });

    onSuccess?.();
  } catch (err) {
    processFirebaseError(err as FirebaseError, onError);
  }
};

export const logInWithEmailAndPassword = async (
  email: string,
  password: string,
  onSuccess?: SuccessCallback,
  onError?: ErrorCallback
) => {
  try {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password);

    onSuccess?.();
  } catch (err) {
    processFirebaseError(err as FirebaseError, onError);
  }
};

export const signInWithAuthProvider = async (
  provider: AuthProvider,
  onSuccess?: SuccessCallback,
  onError?: ErrorCallback
) => {
  let authProvider;

  switch (provider) {
    case AuthProvider.Google:
      authProvider = new GoogleAuthProvider();
      break;
    case AuthProvider.Facebook:
      authProvider = new FacebookAuthProvider();
      break;
    default:
      authProvider = new EmailAuthProvider();
      break;
  }

  try {
    const auth = getAuth();
    await signInWithPopup(auth, authProvider);

    onSuccess?.();
  } catch (err) {
    processFirebaseError(err as FirebaseError, onError);
  }
};

export const logOut = async (onSuccess?: SuccessCallback, onError?: ErrorCallback) => {
  try {
    const auth = getAuth();
    await signOut(auth);

    onSuccess?.();
  } catch (err) {
    processFirebaseError(err as FirebaseError, onError);
  }
};

export const getCurrentAuthUser = () =>
  new Promise<User | null>(resolve => {
    const auth = getAuth();
    auth?.onAuthStateChanged(u => {
      resolve(u);
    });
  });
