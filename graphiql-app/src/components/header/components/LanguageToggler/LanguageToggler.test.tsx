import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import LanguageToggler from './LanguageToggler';

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('language toggler tests', () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (usePathname as jest.Mock).mockReturnValue('/en');
    (useSearchParams as jest.Mock).mockReturnValue({
      toString: () => '',
    });
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  test('language toggler should have En/Ru text', () => {
    render(<LanguageToggler />);
    expect(screen.getByText('En')).toBeInTheDocument();
    expect(screen.getByText('Ru')).toBeInTheDocument();
  });

  test('path should be cnahge the click to Ru language button', () => {
    render(<LanguageToggler />);
    const ruLangBtn = screen.getByText('Ru');
    fireEvent.click(ruLangBtn);
    expect(mockPush).toHaveBeenCalledWith('/ru');
  });
});
