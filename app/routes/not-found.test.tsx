import { render, screen } from '@testing-library/react';
import { createRoutesStub } from 'react-router';
import { describe, expect, it } from 'vitest';
import NotFoundPage, { loader } from './not-found';

describe('not found', () => {
  it('answers with a 404', () => {
    expect(loader()).toMatchObject({ init: { status: 404 } });
  });

  it('shows the page under the header, without the footer', async () => {
    const Stub = createRoutesStub([{ path: '*', Component: NotFoundPage }]);
    render(<Stub initialEntries={['/nope']} />);

    expect(await screen.findByRole('heading', { level: 1 }))
      .toHaveTextContent('Page not found.');
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main');
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
  });
});
