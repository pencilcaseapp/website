import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextLink } from './text-link';

const meta = {
  title: 'Navigation/TextLink',
  component: TextLink,
  args: { href: '#', children: 'privacy policy' },
  decorators: [
    Story => (
      <p className="type-body-lg max-w-md p-4">
        How we handle personal data is described in our
        {' '}
        <Story />
        .
      </p>
    ),
  ],
} satisfies Meta<typeof TextLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
