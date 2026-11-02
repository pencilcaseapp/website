import { data } from 'react-router';
import { HelpArticle } from '~/components/help-article/help-article';
import { PageLayout } from '~/components/page-layout/page-layout';
import { findHelpArticle } from '~/utils/help';
import { getHelpAnswer, stripMarkdown } from '~/utils/help-content.server';
import type { Route } from './+types/help-article';

export function loader({ params }: Route.LoaderArgs) {
  const found = findHelpArticle(params.slug);

  if (!found) {
    throw data(null, { status: 404 });
  }

  const answer = getHelpAnswer(found.article);

  return {
    ...found,
    ...answer,
    description: stripMarkdown(answer.summary),
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
  return (
    <PageLayout header="white">
      <HelpArticle {...loaderData} />
    </PageLayout>
  );
}
