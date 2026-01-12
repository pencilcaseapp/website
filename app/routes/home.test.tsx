import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { createRoutesStub } from 'react-router';
import Home from './home';
import { page } from 'vitest/browser';

test('matches snapshot', async () => {
  await page.viewport(1280, 720);

  const Stub = createRoutesStub([
    {
      path: '/',
      Component: Home,
    },
  ]);

  await render(<Stub />);

  await expect(page.getByTestId('page-home')).toMatchScreenshot();
});
