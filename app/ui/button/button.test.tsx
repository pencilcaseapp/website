import { expect, test } from 'vitest';
import { render } from 'vitest-browser-react';
import { Button } from './button';

test('matches snapshot', async () => {
  const { container } = await render(<Button>Hello Button 1</Button>);

  await expect(container).toMatchScreenshot();
});
