import { render, screen } from '@testing-library/react';
import { createRoutesStub } from 'react-router';
import { describe, expect, it } from 'vitest';
import { SiteHeader, type SiteHeaderProps } from './site-header';

function renderHeader(props: SiteHeaderProps = {}) {
  const Stub = createRoutesStub([
    { path: '/', Component: () => <SiteHeader {...props} /> },
  ]);

  return render(<Stub />);
}

describe('SiteHeader', () => {
  it('links the logo to the start page', () => {
    renderHeader();

    expect(screen.getByRole('link', { name: 'pencil case' }))
      .toHaveAttribute('href', '/');
  });

  it('links to the sections', () => {
    renderHeader();

    const nav = screen.getByRole('navigation', { name: 'Sections' });

    expect(nav).toHaveTextContent('FeaturesSmall techPricingBlog');
  });

  it('signs in on the app', () => {
    renderHeader();

    expect(screen.getByRole('link', { name: 'Sign in' }))
      .toHaveAttribute('href', 'https://docs.pencilcase.app');
  });

  it('offers to skip to the content', () => {
    renderHeader();

    expect(screen.getByRole('link', { name: 'Skip to content' }))
      .toHaveAttribute('href', '#main');
  });

  it('is yellow on the start page', () => {
    renderHeader();

    expect(screen.getByRole('banner')).toHaveClass('bg-pca-yellow-500');
  });

  it('turns white on the pages behind it', () => {
    renderHeader({ tone: 'white' });

    expect(screen.getByRole('banner')).toHaveClass('bg-pca-white');
    expect(screen.getByRole('link', { name: 'Pricing' }))
      .toHaveClass('bg-pca-yellow-500');
  });
});
