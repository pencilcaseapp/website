import type { Meta, StoryObj } from '@storybook/react-vite';
import { SiteFooter } from './site-footer';

/** The footer below the end of a page, which overlaps it. */
const meta = {
  title: 'Sections/SiteFooter',
  component: SiteFooter,
  parameters: { layout: 'fullscreen' },
  decorators: [
    Story => (
      <>
        <div className="relative z-10 h-48 rounded-b-[2.5rem] bg-pca-white" />
        <Story />
      </>
    ),
  ],
} satisfies Meta<typeof SiteFooter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
