import type { Meta, StoryObj } from '@storybook/react-vite';
import { HandNote } from './hand-note';

const meta = {
  title: 'Data Display/HandNote',
  component: HandNote,
  args: { children: 'drag me' },
  decorators: [Story => <div className="bg-pca-yellow-500 p-8"><Story /></div>],
} satisfies Meta<typeof HandNote>;

export default meta;
type Story = StoryObj<typeof meta>;

export const OnTheRight: Story = {};

export const OnTheLeft: Story = {
  args: { side: 'left', children: 'edit on tablet' },
};
