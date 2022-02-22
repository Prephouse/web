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

export enum AuthProvider {
  Google = 'google',
  Facebook = 'facebook',
}

export const registerWithEmailAndPassword = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  onSuccess?: () => void,
  onError?: (code?: string) => void
) => {
  try {
    const auth = getAuth();
    const res = await createUserWithEmailAndPassword(auth, email, password);

    updateProfile(res.user, {
      displayName: `${firstName} ${lastName}`,
    });

    onSuccess?.();
  } catch (err) {
    onError?.((err as FirebaseError).code);
  }
};

export const logInWithEmailAndPassword = async (
  email: string,
  password: string,
  onSuccess?: () => void,
  onError?: (code?: string) => void
) => {
  try {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password);

    onSuccess?.();
  } catch (err) {
    onError?.((err as FirebaseError).code);
  }
};

export const signInWithAuthProvider = async (
  provider: AuthProvider,
  onSuccess?: () => void,
  onError?: (code?: string) => void
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
    onError?.((err as FirebaseError).code);
  }
};

export const logOut = async (onSuccess?: () => void, onError?: (code?: string) => void) => {
  try {
    const auth = getAuth();
    await signOut(auth);

    onSuccess?.();
  } catch (err) {
    onError?.((err as FirebaseError).code);
  }
};

export const getCurrentAuthUser = () =>
  new Promise<User | null>(resolve => {
    const auth = getAuth();
    auth?.onAuthStateChanged(u => {
      resolve(u);
    });
  });
