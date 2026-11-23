import type { Meta, StoryObj } from '@storybook/react-vite';
import { NotFound } from './not-found';

/** The 404 page, for an address with nothing behind it. */
const meta = {
  title: 'Sections/NotFound',
  component: NotFound,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof NotFound>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
