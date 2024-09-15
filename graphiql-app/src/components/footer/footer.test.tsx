import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import Footer from './footer';

type MockTranslationsTypes = 'copyright';

jest.mock('next-intl', () => ({
  useTranslations:
    () =>
    (key: MockTranslationsTypes): string => {
      const mockTranslations: Record<MockTranslationsTypes, string> = {
        copyright: "© 2024 You've reached the end! Extra points for you!",
      };
      return mockTranslations[key];
    },
}));

describe('footer tests', () => {
  test('copyright text should be in footer', () => {
    render(<Footer />);
    expect(
      screen.getByText("© 2024 You've reached the end! Extra points for you!"),
    ).toBeInTheDocument();
  });
});
