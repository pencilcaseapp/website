import type { Preview } from '@storybook/react-vite';
import '../app/app.css';
import '../app/fonts.css';

const preview: Preview = {
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
