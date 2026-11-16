import type { Meta, StoryObj } from '@storybook/react-vite';
import { CancelContract, WithdrawContract } from './contract-page';

/** The pages behind the footer's cancel and withdraw links. */
const meta = {
  title: 'Sections/Contract',
  component: CancelContract,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof CancelContract>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Cancel: Story = {};

export const Withdraw: Story = {
  render: () => <WithdrawContract />,
};
