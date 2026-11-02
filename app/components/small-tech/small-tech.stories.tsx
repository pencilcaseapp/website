import type { Meta, StoryObj } from '@storybook/react-vite';
import { SmallTech } from './small-tech';

/**
 * Scroll down: each panel holds still, and shrinks back as the next one
 * covers it.
 */
const meta = {
  title: 'Sections/Small Tech',
  component: SmallTech,
  parameters: { layout: 'fullscreen' },
  decorators: [Story => <div className="pb-[100vh]"><Story /></div>],
} satisfies Meta<typeof SmallTech>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
