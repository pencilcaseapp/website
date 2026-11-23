import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteLoaderData,
} from 'react-router';

import type { Route } from './+types/root';
import './app.css';
import { NotFound } from './components/not-found/not-found';
import { getConfig } from './config';
import { ConfigContext, useConfig } from './hooks/use-config';
import { useInstantPageChange } from './hooks/use-instant-page-change';
import { usePlausiblePageviews } from './hooks/use-plausible-pageviews';
import fontsHref from './fonts.css?url';

import interRegular from
  '@fontsource/inter/files/inter-latin-400-normal.woff2?url';
import interMedium from
  '@fontsource/inter/files/inter-latin-500-normal.woff2?url';
import interSemiBold from
  '@fontsource/inter/files/inter-latin-600-normal.woff2?url';
import interBold from
  '@fontsource/inter/files/inter-latin-700-normal.woff2?url';
import hankenBold from
  '@fontsource/hanken-grotesk/files/hanken-grotesk-latin-700-normal.woff2?url';
import coveredRegular from
  '@fontsource/covered-by-your-grace/files/covered-by-your-grace-latin-400-normal.woff2?url';

// Found through `fonts.css` alone, the fonts arrive after the first paint,
// and its text, held back by `font-display: block`, shows up late.
// Preloaded, they are there in time. The files are the Latin ones
// `fonts.css` names, the ones the pages draw with.
const FONTS = [
  ...['Regular', 'Bold', 'Black'].map(
    cut => `/fonts/FigGroteskTrial-${cut}.woff2`,
  ),
  interRegular,
  interMedium,
  interSemiBold,
  interBold,
  hankenBold,
  coveredRegular,
];

export const links: Route.LinksFunction = () => [
  ...FONTS.map(href => ({
    rel: 'preload',
    href,
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous' as const,
  })),
  { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
  { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
  { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
  { rel: 'stylesheet', href: fontsHref },
];

export function loader() {
  return { config: getConfig() };
}

export function Layout({ children }: { children: React.ReactNode }) {
  // Left out when the root loader itself failed: the test config then.
  const fallback = useConfig();
  const config = useRouteLoaderData<typeof loader>('root')?.config ?? fallback;

  return (
    <ConfigContext value={config}>
      <Document analytics={config.analytics}>{children}</Document>
    </ConfigContext>
  );
}

function Document({
  analytics,
  children,
}: {
  analytics: boolean;
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
        <Meta />
        <Links />
        {analytics && <Analytics />}
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const plausibleInit = `
  window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};
  plausible.init({ hashBasedRouting: true, autoCapturePageviews: false })
`;

function Analytics() {
  return (
    <>
      <script
        async
        src="https://plausible.io/js/pa-POGXETO_1FgJMezhrCH8J.js"
      />
      <script dangerouslySetInnerHTML={{ __html: plausibleInit }} />
    </>
  );
}

export default function App() {
  useInstantPageChange();
  usePlausiblePageviews();

  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const { environment } = useConfig();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return <NotFound />;
  }

  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = 'Error';
    details = error.statusText || details;
  }
  else if (environment === 'development' && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
