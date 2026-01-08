import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { createRoutesStub } from 'react-router';
import Home from './home';

test('matches snapshot', async () => {
  const Stub = createRoutesStub([
    {
      path: '/',
      Component: Home,
    },
  ]);

  const { container } = await render(<Stub />);

  await expect(container).toMatchScreenshot();
});
