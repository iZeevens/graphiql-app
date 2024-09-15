import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { SignInForm } from './SignInForm';

type MockTranslationsTypes =
  | 'title'
  | 'signInBtn'
  | 'emailPlaceholder'
  | 'passwordPlaceholder';

jest.mock('next/navigation', () => {
  const router = {
    push: jest.fn(),
    pathname: '/',
    rout: '',
  };
  return {
    useRouter: jest.fn().mockReturnValue(router),
  };
});

jest.mock('next-intl', () => ({
  useTranslations:
    () =>
    (key: MockTranslationsTypes): string => {
      const mockTranslations: Record<MockTranslationsTypes, string> = {
        title: 'Sign In',
        signInBtn: 'Sign Ip',
        emailPlaceholder: 'Email',
        passwordPlaceholder: 'Password',
      };
      return mockTranslations[key];
    },
}));

describe('Sign In form tests', () => {
  test('sign in form should be have title', () => {
    render(<SignInForm />);
    expect(screen.getByText('Sign In')).toBeInTheDocument();
  });
});
