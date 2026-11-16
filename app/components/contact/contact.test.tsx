import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { describe, expect, it } from 'vitest';
import { Contact } from './contact';

describe('Contact', () => {
  it('asks for an e-mail address and a message', () => {
    render(<Contact />, { wrapper: MemoryRouter });

    expect(screen.getByRole('heading', { level: 1 }))
      .toHaveTextContent('Say hello.');
    expect(screen.getByLabelText('Your e-mail address'))
      .toHaveAttribute('type', 'email');
    expect(screen.getByLabelText('Your message')).toBeRequired();
    expect(screen.getByRole('button', { name: 'Send message' }))
      .toHaveAttribute('type', 'submit');
  });

  it('points to the privacy policy and the inbox', () => {
    render(<Contact />, { wrapper: MemoryRouter });

    expect(screen.getByRole('link', { name: 'privacy policy' }))
      .toHaveAttribute('href', '/privacy');
    expect(screen.getByRole('link', { name: 'inbox@pencilcase.app' }))
      .toHaveAttribute('href', 'mailto:inbox@pencilcase.app');
  });
});
