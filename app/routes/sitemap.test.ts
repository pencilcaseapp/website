import { describe, expect, it } from 'vitest';
import { loader } from './sitemap';

describe('/sitemap.xml', () => {
  it('lists the pages, the help articles and the legal pages', async () => {
    const response = loader();
    const xml = await response.text();

    expect(response.headers.get('Content-Type')).toContain('application/xml');
    for (const path of [
      '',
      '/help',
      '/help/what-is-pencil-case',
      '/contact',
      '/privacy',
      '/withdraw-contract',
    ]) {
      expect(xml).toContain(`<loc>https://pencilcase.app${path}</loc>`);
    }
  });
});
