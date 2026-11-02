import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';
import { findHelpArticle } from '~/utils/help';
import { HelpArticle } from './help-article';

/** One article of the help section. */
const meta = {
  title: 'Sections/HelpArticle',
  component: HelpArticle,
  parameters: { layout: 'fullscreen' },
  decorators: [Story => <MemoryRouter><Story /></MemoryRouter>],
  args: findHelpArticle('share-with-a-link')!,
} satisfies Meta<typeof HelpArticle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** About something the app does not do yet. */
export const Draft: Story = {
  args: findHelpArticle('what-are-spaces')!,
};
