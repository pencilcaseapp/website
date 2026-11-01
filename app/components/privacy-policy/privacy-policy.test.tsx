import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PrivacyPolicy } from './privacy-policy';

describe('PrivacyPolicy', () => {
  it('shows the version', () => {
    render(<PrivacyPolicy />);

    expect(screen.getByText('27 October 2026'))
      .toHaveAttribute('datetime', '2026-10-27');
  });

  it('numbers the sections', () => {
    render(<PrivacyPolicy />);

    expect(screen.getAllByRole('heading', { level: 2 })
      .map(heading => heading.textContent))
      .toEqual([
        '11. Who is responsible',
        '22. What we process and why',
        '33. Cookies and local storage',
        '44. Who else receives data',
        '55. How long we keep it',
        '66. Your rights',
        '77. Changes',
      ]);
  });

  it('lays out the details in tables', () => {
    render(<PrivacyPolicy />);

    for (const name of [
      'What we process, why, and on what legal basis',
      'Cookies and local storage we use',
      'Providers that receive data',
      'When other data is deleted',
    ]) {
      expect(screen.getByRole('table', { name })).toBeInTheDocument();
    }
  });

  it('opens the providers’ policies in a new tab', () => {
    render(<PrivacyPolicy />);

    expect(screen.getByRole('link', { name: 'Bunny’s privacy policy' }))
      .toHaveAttribute('target', '_blank');
  });
});
