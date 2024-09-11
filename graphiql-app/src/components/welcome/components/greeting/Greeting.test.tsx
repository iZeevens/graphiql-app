import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Greeting from './Greeting';

type MockTranslationsTypes = 'greetingUnAuth';

jest.mock('next-intl', () => ({
  useTranslations:
    () =>
    (key: MockTranslationsTypes): string => {
      const mockTranslations: Record<MockTranslationsTypes, string> = {
        greetingUnAuth: 'Welcome! Explore',
      };
      return mockTranslations[key];
    },
}));

describe('greeting tests', () => {
  test('Welcome back text should be in greeting component', () => {
    render(<Greeting user={null} />);
    expect(screen.getByText('Welcome! Explore')).toBeInTheDocument();
  });
});
