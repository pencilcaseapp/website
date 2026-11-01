import type { Meta, StoryObj } from '@storybook/react-vite';
import { PhoneMock } from './phone-mock';

const meta = {
  title: 'Data Display/PhoneMock',
  component: PhoneMock,
  args: { className: 'w-[300px]' },
} satisfies Meta<typeof PhoneMock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Small: Story = {
  args: { className: 'w-[200px]' },
};
