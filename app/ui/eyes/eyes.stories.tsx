import type { Meta, StoryObj } from '@storybook/react-vite';
import { Eyes } from './eyes';

/** Move the mouse across the canvas: the pupils follow it. */
const meta = {
  title: 'Data Display/Eyes',
  component: Eyes,
  decorators: [Story => <div className="bg-pca-grey-900 p-8"><Story /></div>],
} satisfies Meta<typeof Eyes>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
