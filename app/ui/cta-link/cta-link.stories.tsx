import type { Meta, StoryObj } from '@storybook/react-vite';
import { CtaLink } from './cta-link';

const meta = {
  title: 'Navigation/CtaLink',
  component: CtaLink,
  args: { href: '#', children: 'Get started' },
} satisfies Meta<typeof CtaLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {};

export const Medium: Story = {
  args: { size: 'medium', colorLight: 'red-600', children: 'Sign in' },
};

export const Small: Story = {
  args: { size: 'small', colorLight: 'red-600', children: 'Sign in' },
};
