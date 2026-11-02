import { data } from 'react-router';
import { HelpArticle } from '~/components/help-article/help-article';
import { PageLayout } from '~/components/page-layout/page-layout';
import {
  findHelpArticle,
  relatedHelpArticles,
  stripMarkdown,
} from '~/utils/help.server';
import type { Route } from './+types/help-article';

export function loader({ params }: Route.LoaderArgs) {
  const found = findHelpArticle(params.slug);

  if (!found) {
    throw data(null, { status: 404 });
  }

  return {
    ...found,
    related: relatedHelpArticles(found.article),
    description: stripMarkdown(found.article.summary),
  };
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) {
    return [{ title: 'Help – pencil case' }];
  }

  const { article, description } = loaderData;

  return [
    { title: `${article.question} – pencil case` },
    { name: 'description', content: description },
    ...article.draft ? [{ name: 'robots', content: 'noindex' }] : [],
  ];
}

export default function HelpArticlePage({ loaderData }: Route.ComponentProps) {
  const { article, section, related } = loaderData;

  return (
    <PageLayout header="white">
      <HelpArticle article={article} section={section} related={related} />
    </PageLayout>
  );
}
