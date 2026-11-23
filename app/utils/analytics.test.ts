import { describe, expect, it } from 'vitest';
import { plausibleEvent } from './analytics';

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
