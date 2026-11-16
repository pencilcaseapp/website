import type { Meta, StoryObj } from '@storybook/react-vite';
import { createRoutesStub } from 'react-router';
import { Contact } from './contact';

/** A data router, which the contact form's fetcher needs. */
const RoutesStub = createRoutesStub([
  { path: '/', Component: Contact },
  { path: '/contact', action: () => ({ sent: true }) },
]);

/** The contact form behind the footer's Contact pill. */
const meta = {
  title: 'Sections/Contact',
  component: Contact,
  parameters: { layout: 'fullscreen' },
  render: () => <RoutesStub />,
} satisfies Meta<typeof Contact>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
