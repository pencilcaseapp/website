import { data } from 'react-router';
import { HelpArticle } from '~/components/help-article/help-article';
import { PageLayout } from '~/components/page-layout/page-layout';
import { findHelpArticle, stripHelpMarks } from '~/utils/help';
import type { Route } from './+types/help-article';

export function loader({ params }: Route.LoaderArgs) {
  const found = findHelpArticle(params.slug);

  if (!found) {
    throw data(null, { status: 404 });
  }

  return found;
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) {
    return [{ title: 'Help – pencil case' }];
  }

  const { article } = loaderData;

  return [
    { title: `${article.question} – pencil case` },
    { name: 'description', content: stripHelpMarks(article.summary) },
    ...article.draft ? [{ name: 'robots', content: 'noindex' }] : [],
  ];
}

export default function HelpArticlePage({ loaderData }: Route.ComponentProps) {
  return (
    <PageLayout header="white">
      <HelpArticle article={loaderData.article} section={loaderData.section} />
    </PageLayout>
  );
}
