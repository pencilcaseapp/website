import type { Meta, StoryObj } from '@storybook/react-vite';
import { createRoutesStub } from 'react-router';
import { getHelpSections } from '~/utils/help.server';
import { Help } from './help';

/** A data router, which the contact form's fetcher needs. */
const RoutesStub = createRoutesStub([
  { path: '/', Component: () => <Help sections={getHelpSections()} /> },
  { path: '/contact', action: () => ({ sent: true }) },
]);

/** The help section behind the footer's Help pill. */
const meta = {
  title: 'Sections/Help',
  component: Help,
  parameters: { layout: 'fullscreen' },
  args: { sections: getHelpSections() },
  render: () => <RoutesStub />,
} satisfies Meta<typeof Help>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
