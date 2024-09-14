import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { SignUpForm } from './SignUpForm';

type MockTranslationsTypes =
  | 'title'
  | 'signUpBtn'
  | 'emailPlaceholder'
  | 'passwordPlaceholder'
  | 'userNamePlaceholder';

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
        title: 'Sign Up',
        signUpBtn: 'Sign Up',
        emailPlaceholder: 'Email',
        passwordPlaceholder: 'Password',
        userNamePlaceholder: 'UserName',
      };
      return mockTranslations[key];
    },
}));

describe('Sign Up form tests', () => {
  test('sign up form should be have title', () => {
    render(<SignUpForm />);
    expect(screen.getByRole('heading')).toHaveTextContent('Sign Up');
  });
});
