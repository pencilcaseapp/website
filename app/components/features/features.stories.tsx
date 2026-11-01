import type { Meta, StoryObj } from '@storybook/react-vite';
import { Features } from './features';

/**
 * Scroll the page with the pointer over the cards: it has to move the
 * page, never get stuck in the row.
 */
const meta = {
  title: 'Sections/Features',
  component: Features,
  parameters: { layout: 'fullscreen' },
  decorators: [Story => <div className="pb-[100vh]"><Story /></div>],
} satisfies Meta<typeof Features>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
