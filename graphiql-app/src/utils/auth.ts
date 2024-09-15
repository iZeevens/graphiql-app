import { ISignInFormData, ISignUpFormData } from '@/types/formsType';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

import { auth } from './fireBaseConfig';

const registerWithEmailAndPassword = async (
  { name, email, password }: ISignUpFormData,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(res.user, { displayName: name });
    document.cookie = `userid=${res.user.uid}`;

    return true;
  } catch (err) {
    if (err instanceof Error) {
      setError(err.message);
    }
  }
};

const logInWithEmailAndPassword = async (
  { email, password }: ISignInFormData,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);

    if (auth.currentUser) return true;

    document.cookie = `userid=${res.user.uid}`;
  } catch (err) {
    if (err instanceof Error) {
      setError(err.message);
    }
  }
};

const logout = async () => {
  await signOut(auth);
  document.cookie = 'userid=';
};

export { registerWithEmailAndPassword, logInWithEmailAndPassword, logout };
