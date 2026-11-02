import type { Preview } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';
import '../app/app.css';
import '../app/fonts.css';

const preview: Preview = {
  decorators: [
    Story => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
