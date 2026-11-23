import { describe, expect, it } from 'vitest';
import { loader } from './robots';

describe('/robots.txt', () => {
  it('allows every crawler and points to the sitemap', async () => {
    const text = await loader().text();

    expect(text).toContain('User-agent: *\nAllow: /');
    expect(text).toContain('Sitemap: https://pencilcase.app/sitemap.xml');
  });
});
