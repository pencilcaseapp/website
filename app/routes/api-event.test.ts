// @vitest-environment node
import { afterEach, describe, expect, it, vi } from 'vitest';
import { action } from './api-event';

function post(headers: Record<string, string>) {
  const request = new Request('https://pencilcase.app/api/event', {
    method: 'POST',
    headers,
    body: '{"n":"pageview"}',
  });

  return action({ request } as Parameters<typeof action>[0]);
}

describe('/api/event', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('passes the event on with the visitor’s address and browser', async () => {
    const fetch = vi.fn().mockResolvedValue(new Response('ok', {
      status: 202,
    }));
    vi.stubGlobal('fetch', fetch);

    const response = await post({
      'Content-Type': 'text/plain',
      'User-Agent': 'Mozilla/5.0',
      'X-Forwarded-For': '203.0.113.7, 10.0.0.1',
      'Cookie': 'session=1',
    });

    const [url, init] = fetch.mock.calls[0];
    expect(url).toBe('https://plausible.io/api/event');
    expect(init.body).toBe('{"n":"pageview"}');
    expect(Object.fromEntries(init.headers)).toEqual({
      'content-type': 'text/plain',
      'user-agent': 'Mozilla/5.0',
      'x-forwarded-for': '203.0.113.7, 10.0.0.1',
    });
    expect(response.status).toBe(202);
    expect(response.headers.get('Cache-Control')).toBe('no-store');
  });
});
