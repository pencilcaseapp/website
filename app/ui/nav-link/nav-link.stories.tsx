import type { Meta, StoryObj } from '@storybook/react-vite';
import { NavLink } from './nav-link';

const meta = {
  title: 'Navigation/NavLink',
  component: NavLink,
  args: { href: '#', children: 'Features' },
  decorators: [Story => <div className="bg-pca-yellow-500 p-4"><Story /></div>],
} satisfies Meta<typeof NavLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
