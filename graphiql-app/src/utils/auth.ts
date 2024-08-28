import { ISignUpFormData } from '@/types/formsType';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import { auth } from './fireBaseConfig';

const registerWithEmailAndPassword = async (
  { name, email, password }: ISignUpFormData,
  setError: React.Dispatch<React.SetStateAction<string | null>>,
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(res.user, { displayName: name });
    return true;

    document.cookie = `userid=${res.user.uid}`;
  } catch (err) {
    if (err instanceof Error) {
      setError(err.message);
    }
  }
};

export { registerWithEmailAndPassword };
