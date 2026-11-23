/**
 * The classes that have Plausible send the custom event `name`, with
 * `props`, when the element is clicked (its tagged events). Plausible
 * sends it with `keepalive`, so a link may leave the page right away.
 */
export function plausibleEvent(
  name: string,
  props: Record<string, string> = {},
) {
  return Object.entries({ name, ...props })
    .map(([key, value]) =>
      `plausible-event-${key}=${value.replaceAll(' ', '+')}`)
    .join(' ');
}
