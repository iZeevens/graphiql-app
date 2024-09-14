import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

import {
  logInWithEmailAndPassword,
  logout,
  registerWithEmailAndPassword,
} from './auth';

jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(() => ({
    currentUser: { uid: '12345' },
  })),
  createUserWithEmailAndPassword: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  updateProfile: jest.fn(),
}));

jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
}));

const mockUserRegisterCredentials = {
  name: '123',
  email: '123@123.com',
  password: '123',
};

const mockUserLoginCredentials = {
  email: '123@123.com',
  password: '123',
};

const mockUserId = { uid: '123' };

describe('test auth functions', () => {
  let setError: jest.Mock;

  beforeEach(() => {
    setError = jest.fn();
  });

  describe('tests for registerWithEmailAndPassword', () => {
    test('should be register a user', async () => {
      (createUserWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({
        user: mockUserId,
      });

      await registerWithEmailAndPassword(mockUserRegisterCredentials, setError);

      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        '123@123.com',
        '123',
      );
      expect(updateProfile).toHaveBeenCalledWith(mockUserId, {
        displayName: '123',
      });
      expect(setError).not.toHaveBeenCalled();
    });

    test('should be handle errors then user is register with wrong email/password', async () => {
      const mockError = new Error('error');
      (createUserWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(
        mockError,
      );

      await registerWithEmailAndPassword(mockUserRegisterCredentials, setError);

      expect(setError).toHaveBeenCalledWith('error');
    });
  });

  describe('tests for logInWithEmailAndPassword', () => {
    test('should be logIn a user', async () => {
      (signInWithEmailAndPassword as jest.Mock).mockResolvedValueOnce({
        user: mockUserId,
      });

      await logInWithEmailAndPassword(mockUserLoginCredentials, setError);

      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(),
        '123@123.com',
        '123',
      );
      expect(setError).not.toHaveBeenCalled();
    });

    test('should be handle errors then user is login with wrong email/password', async () => {
      const mockError = new Error('error');
      (signInWithEmailAndPassword as jest.Mock).mockRejectedValueOnce(
        mockError,
      );

      await logInWithEmailAndPassword(mockUserLoginCredentials, setError);

      expect(setError).toHaveBeenCalledWith('error');
    });
  });

  describe('tests for logout', () => {
    test('should be logOut a user', async () => {
      await logout();

      expect(signOut).toHaveBeenCalledWith(expect.anything());
    });
  });
});
