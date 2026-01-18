import { href } from 'react-router';

type Args = Parameters<typeof href>;

export function hrefWithTrailingSlash<Path extends Args[0]>(
  path: Path,
  ...args: Path extends Args[0] ? Args extends [Args[0], ...infer Rest] ? Rest : never : never
) {
  return withBasePath(`${href(path, ...args)}/`);
}

/**
 * Prepends the base path (from Vite's BASE_URL) to a path.
 * Used for deploying to subpaths like GitHub Pages PR previews.
 */
function withBasePath(path: string): string {
  const base = import.meta.env.BASE_URL;
  // Remove trailing slash from base and leading slash from path to avoid double slashes
  const normalizedBase = base.endsWith('/') ? base.slice(0, -1) : base;
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}
