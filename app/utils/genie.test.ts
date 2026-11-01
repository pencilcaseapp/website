import { afterEach, describe, expect, it, vi } from 'vitest';
import { playGenie } from './genie';

function setup() {
  const stage = document.createElement('div');
  const frame = document.createElement('div');
  const shell = document.createElement('div');
  const icon = document.createElement('span');
  shell.textContent = 'window';
  frame.append(shell);
  stage.append(frame, icon);
  document.body.append(stage);
  return { stage, frame, shell, icon };
}

afterEach(() => {
  vi.useRealTimers();
  document.body.innerHTML = '';
});

describe('playGenie', () => {
  it('draws the window in slices on top of the stage', () => {
    const elements = setup();

    playGenie({ ...elements, reverse: false, slow: false, onDone: vi.fn() });

    const layer = elements.stage.lastElementChild!;
    expect(layer).toHaveAttribute('aria-hidden', 'true');
    expect(layer.children).toHaveLength(60);
    expect(layer.children[0]).toHaveTextContent('window');
  });

  it('cleans up and reports when it is done', async () => {
    vi.useFakeTimers({ toFake: ['requestAnimationFrame', 'performance'] });
    const elements = setup();
    const onDone = vi.fn();

    playGenie({ ...elements, reverse: false, slow: false, onDone });
    vi.advanceTimersByTime(600);

    expect(onDone).toHaveBeenCalled();
    expect(elements.stage.children).toHaveLength(2);
  });

  it('cleans up when cancelled', () => {
    const elements = setup();
    const onDone = vi.fn();

    const cancel = playGenie({
      ...elements,
      reverse: true,
      slow: true,
      onDone,
    });
    cancel();

    expect(onDone).not.toHaveBeenCalled();
    expect(elements.stage.children).toHaveLength(2);
  });
});
