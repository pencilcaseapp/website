import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';
import {
  findHelpArticle,
  relatedHelpArticles,
} from '~/utils/help.server';
import { HelpArticle } from './help-article';

function articleArgs(slug: string) {
  const found = findHelpArticle(slug)!;

  return { ...found, related: relatedHelpArticles(found.article) };
}

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
