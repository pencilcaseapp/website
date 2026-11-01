import type { Meta, StoryObj } from '@storybook/react-vite';
import { Accordion } from './accordion';

/** Click a question twice in a row: its text must not get selected. */
const meta = {
  title: 'Data Display/Accordion',
  component: Accordion,
  decorators: [Story => <div className="max-w-[760px]"><Story /></div>],
  args: {
    items: [
      {
        id: 'one',
        title: 'Do I need a subscription?',
        content: 'No. Free gives you 5 documents for life.',
      },
      {
        id: 'two',
        title: 'Can I buy a subscription in the Apple App Store or Google Play Store?',
        content: 'No. Pro is bought on our website.',
      },
    ],
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
