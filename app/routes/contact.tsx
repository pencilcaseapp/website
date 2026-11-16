import { Contact } from '~/components/contact/contact';
import { PageLayout } from '~/components/page-layout/page-layout';

export function meta() {
  return [{ title: 'Contact – pencil case' }];
}

export default function ContactPage() {
  return (
    <PageLayout header="white">
      <Contact />
    </PageLayout>
  );
}
