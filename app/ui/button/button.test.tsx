import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Button } from './button';
import { page } from 'vitest/browser';

test('matches snapshot', async () => {
  await page.viewport(1280, 720);
  await render(<Button>Hello Button</Button>);
  await expect(page.getByText('Hello Button')).toMatchScreenshot();
});
