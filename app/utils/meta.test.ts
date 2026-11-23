import { describe, expect, it } from 'vitest';
import { homeStructuredData, pageMeta } from './meta';

describe('pageMeta', () => {
  const meta = pageMeta({
    title: 'Help – pencil case',
    description: 'Answers.',
    path: '/help',
  });

  it('names the page and its canonical URL', () => {
    expect(meta).toContainEqual({ title: 'Help – pencil case' });
    expect(meta).toContainEqual({ name: 'description', content: 'Answers.' });
    expect(meta).toContainEqual({
      tagName: 'link',
      rel: 'canonical',
      href: 'https://pencilcase.app/help',
    });
  });

  it('previews a shared link with the share image', () => {
    expect(meta).toContainEqual({
      property: 'og:url',
      content: 'https://pencilcase.app/help',
    });
    expect(meta).toContainEqual({
      property: 'og:image',
      content: 'https://pencilcase.app/share-image.png',
    });
    expect(meta).toContainEqual({
      name: 'twitter:card',
      content: 'summary_large_image',
    });
  });

  it('gives the startpage the bare domain', () => {
    expect(pageMeta({ title: 'pencil case', description: '', path: '/' }))
      .toContainEqual({
        tagName: 'link',
        rel: 'canonical',
        href: 'https://pencilcase.app',
      });
  });
});

describe('homeStructuredData', () => {
  it('lists both plans and every question', () => {
    const [app, faq] = homeStructuredData().map(
      item => 'script:ld+json' in item && item['script:ld+json'],
    );

    expect(app).toMatchObject({
      '@type': 'WebApplication',
      'offers': [
        { name: 'Free', price: 0, priceCurrency: 'EUR' },
        { name: 'Pro', price: 25, priceCurrency: 'EUR' },
      ],
    });
    expect(faq).toMatchObject({
      '@type': 'FAQPage',
      'mainEntity': expect.arrayContaining([
        expect.objectContaining({
          '@type': 'Question',
          'name': 'Do I need a subscription?',
        }),
      ]),
    });
  });
});
