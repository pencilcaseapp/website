import { data, href } from 'react-router';
import { HelpArticle } from '~/components/help-article/help-article';
import { PageLayout } from '~/components/page-layout/page-layout';
import {
  findHelpArticle,
  getHelpArticlePage,
  stripMarkdown,
} from '~/utils/help.server';
import { pageMeta } from '~/utils/meta';
import type { Route } from './+types/help-article';

export function loader({ params }: Route.LoaderArgs) {
  const page = getHelpArticlePage(params.slug);
  const article = findHelpArticle(params.slug)?.article;

  if (!page || !article) {
    throw data(null, { status: 404 });
  }

  return { ...page, description: stripMarkdown(article.summary) };
}

export function meta({ loaderData }: Route.MetaArgs) {
  if (!loaderData) {
    return [{ title: 'Help – pencil case' }];
  }

  const { article, description } = loaderData;

  return pageMeta({
    title: `${article.question} – pencil case`,
    description,
    path: href('/help/:slug', { slug: article.slug }),
  });
}

export default function HelpArticlePage({ loaderData }: Route.ComponentProps) {
  const { article, summary, body, section, related } = loaderData;

  return (
    <PageLayout header="white">
      <HelpArticle
        article={article}
        summary={summary}
        body={body}
        section={section}
        related={related}
      />
    </PageLayout>
  );
}
