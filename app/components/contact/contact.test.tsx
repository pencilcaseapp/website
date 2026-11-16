import { render, screen } from '@testing-library/react';
import { createRoutesStub } from 'react-router';
import { describe, expect, it } from 'vitest';
import { Contact } from './contact';

/** Renders in a data router, which the contact form's fetcher needs. */
function renderInRouter(ui: React.ReactElement) {
  const Stub = createRoutesStub([{ path: '/', Component: () => ui }]);

  return render(<Stub />);
}

describe('Contact', () => {
  it('asks for an e-mail address and a message', () => {
    renderInRouter(<Contact />);

    expect(screen.getByRole('heading', { level: 1 }))
      .toHaveTextContent('Say hello.');
    expect(screen.getByLabelText('Your e-mail address'))
      .toHaveAttribute('type', 'email');
    expect(screen.getByLabelText('Your message')).toBeRequired();
    expect(screen.getByRole('button', { name: 'Send message' }))
      .toHaveAttribute('type', 'submit');
  });

  it('points to the privacy policy and the inbox', () => {
    renderInRouter(<Contact />);

    expect(screen.getByRole('link', { name: 'privacy policy' }))
      .toHaveAttribute('href', '/privacy');
    expect(screen.getByRole('link', { name: 'inbox@pencilcase.app' }))
      .toHaveAttribute('href', 'mailto:inbox@pencilcase.app');
  });
});
