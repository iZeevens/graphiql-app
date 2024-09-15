import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { BaseInfo } from './BaseInfo';

type MockTranslationsTypes = 'title';

jest.mock('next-intl', () => ({
  useTranslations:
    () =>
    (key: MockTranslationsTypes): string => {
      const mockTranslations: Record<MockTranslationsTypes, string> = {
        title: 'Project: What and Why',
      };
      return mockTranslations[key];
    },
}));

describe('base info component tests', () => {
  test('title should be in base info component', () => {
    render(<BaseInfo translations='' theme='light' />);
    expect(screen.getByText('Project: What and Why')).toBeInTheDocument();
  });
});
