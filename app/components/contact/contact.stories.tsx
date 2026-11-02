import type { Meta, StoryObj } from '@storybook/react-vite';
import { Contact } from './contact';

/** The contact form behind the footer's Contact pill. */
const meta = {
  title: 'Sections/Contact',
  component: Contact,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Contact>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
