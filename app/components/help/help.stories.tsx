import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';
import { getHelpSections } from '~/utils/help.server';
import { Help } from './help';

/** The help section behind the footer's Help pill. */
const meta = {
  title: 'Sections/Help',
  component: Help,
  parameters: { layout: 'fullscreen' },
  decorators: [Story => <MemoryRouter><Story /></MemoryRouter>],
  args: { sections: getHelpSections() },
} satisfies Meta<typeof Help>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
