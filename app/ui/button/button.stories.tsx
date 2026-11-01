import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './button';

const meta = {
  title: 'Forms/Button',
  component: Button,
  args: { children: 'Get started' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {};

export const Medium: Story = {
  args: { size: 'medium', colorLight: 'red-600', children: 'Sign in' },
};

export const Small: Story = {
  args: { size: 'small', colorLight: 'red-600', children: 'Sign in' },
};

export const ExtraSmall: Story = {
  args: { size: 'extraSmall', colorLight: 'red-600', children: 'Sign in' },
};

export const AsLink: Story = {
  render: () => <Button as="a" href="#">Get started</Button>,
};
