import { useQuery, gql } from '@apollo/client';

import { Link } from '../Link/Link';

const FEED_QUERY = gql`
  query {
    feed {
      id
      description
      url
    }
  }
`;

export const LinkList = () => {
  const { data, loading, error } = useQuery(FEED_QUERY);

  console.debug('LinkList ---');
  console.debug('data ', data);
  console.debug('loading ', loading);
  console.debug('error ', error);

  if (!data) {
    return 'Loading...';
  }

  return (
    <div data-testid="link-list">
      {data.feed.map((link: any) => (
        <Link key={link.id} link={link} />
      ))}
    </div>
  );
};
