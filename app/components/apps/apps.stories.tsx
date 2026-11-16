import type { Meta, StoryObj } from '@storybook/react-vite';
import { Apps } from './apps';

const meta = {
  title: 'Sections/Apps',
  component: Apps,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Apps>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
