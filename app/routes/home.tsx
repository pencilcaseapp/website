import { Link } from 'react-router';
import { hrefWithTrailingSlash } from '~/utils/href';
import { Button } from '~/ui';

export function meta() {
  return [{ title: 'pencil case' }];
}

export default function Home() {
  return (
    <div className="inline-flex gap-4 flex-col">
      <h1>pencil case</h1>
      <Link to={hrefWithTrailingSlash('/legal-notice')}>
        Go to legal notice
      </Link>
      <Button>Button</Button>
    </div>
  );
}
