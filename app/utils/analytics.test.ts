import { init, track } from '@plausible-analytics/tracker';
import { describe, expect, it, vi } from 'vitest';
import { plausibleEvent, startAnalytics, trackEvent } from './analytics';

vi.mock('@plausible-analytics/tracker');

describe('startAnalytics', () => {
  it('holds events back until it starts, then starts once', () => {
    trackEvent('404');
    trackEvent('pageview');
    expect(track).not.toHaveBeenCalled();

    startAnalytics();
    startAnalytics();

    expect(init).toHaveBeenCalledExactlyOnceWith(
      expect.objectContaining({
        domain: 'pencilcase.app',
        endpoint: '/api/event',
        hashBasedRouting: true,
        autoCapturePageviews: false,
      }),
    );
    expect(vi.mocked(track).mock.calls).toEqual([
      ['404', {}],
      ['pageview', {}],
    ]);

    trackEvent('pageview');
    expect(track).toHaveBeenCalledTimes(3);
  });
});

describe('plausibleEvent', () => {
  it('tags the event name', () => {
    expect(plausibleEvent('Buy')).toBe('plausible-event-name=Buy');
  });

  it('tags its properties and joins words with a plus', () => {
    expect(plausibleEvent('Get started', { location: 'feature card' }))
      .toBe(
        'plausible-event-name=Get+started '
        + 'plausible-event-location=feature+card',
      );
  });
});
