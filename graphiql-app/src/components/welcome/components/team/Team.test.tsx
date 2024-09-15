import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { Team } from './Team';

type MockTranslationsTypes = 'title';

jest.mock('next-intl', () => ({
  useTranslations:
    () =>
    (key: MockTranslationsTypes): string => {
      const mockTranslations: Record<MockTranslationsTypes, string> = {
        title: 'Our Team',
      };
      return mockTranslations[key];
    },
}));

describe('Team component tests', () => {
  test('Our Team text should be in team component', () => {
    render(<Team />);
    expect(screen.getByText('Our Team')).toBeInTheDocument();
  });
});
