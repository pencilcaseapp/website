import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';
import { getHelpArticlePage } from '~/utils/help.server';
import { HelpArticle } from './help-article';

const articleArgs = (slug: string) => getHelpArticlePage(slug)!;

/** One article of the help section. */
const meta = {
  title: 'Sections/HelpArticle',
  component: HelpArticle,
  parameters: { layout: 'fullscreen' },
  decorators: [Story => <MemoryRouter><Story /></MemoryRouter>],
  args: articleArgs('share-with-a-link'),
} satisfies Meta<typeof HelpArticle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** About something the app does not do yet. */
export const Draft: Story = {
  args: articleArgs('what-are-spaces'),
};
