import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),
  route('legal-notice', 'routes/legal-notice.tsx'),
  route('privacy', 'routes/privacy.tsx'),
  route('terms', 'routes/terms.tsx'),
  route('contact', 'routes/contact.tsx'),
  route('help', 'routes/help.tsx'),
  route('help/:slug', 'routes/help-article.tsx'),
  route('help/:slug.md', 'routes/help-article-markdown.ts'),
] satisfies RouteConfig;
