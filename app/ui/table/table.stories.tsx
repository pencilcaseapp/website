import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from './table';

const meta = {
  title: 'Data Display/Table',
  component: Table,
  args: {
    label: 'Cookies and local storage we use',
    columns: [
      { label: 'Name', width: '17%' },
      { label: 'Type', width: '17%' },
      { label: 'Purpose', width: '38%' },
      { label: 'Lifetime', width: '28%' },
    ],
    rows: [
      [
        'session',
        'Cookie',
        'Keeps you signed in',
        '90 days, renewed each time you use pencil case',
      ],
      [
        'csrf',
        'Cookie',
        'Protects forms against cross-site request forgery',
        'Browser session',
      ],
    ],
  },
  decorators: [
    Story => (
      <div className="mx-auto max-w-[680px] px-4 py-8">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
