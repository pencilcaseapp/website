import type { Meta, StoryObj } from '@storybook/react-vite';
import { Container } from './container';

const meta = {
  title: 'Layout/Container',
  component: Container,
  args: {
    children: <div className="h-32 rounded-2xl bg-pca-yellow-500" />,
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
