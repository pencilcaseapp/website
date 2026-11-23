import { Contact } from '~/components/contact/contact';
import { PageLayout } from '~/components/page-layout/page-layout';
import { pageMeta } from '~/utils/meta';

export const meta = () => pageMeta({
  title: 'Contact – pencil case',
  description:
    'Questions, ideas, a bug? Write to us and we’ll get back to you.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <PageLayout header="white">
      <Contact />
    </PageLayout>
  );
}
