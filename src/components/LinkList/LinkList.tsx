import { useQuery } from '@apollo/client';

import { LinkCard } from '../LinkCard/LinkCard';
import { FEED_QUERY } from './LinkList.graphql';

import classes from './LinkList.module.css';

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
    <div className={classes.linkList} data-testid="link-list">
      {data.feed.map((link: any) => (
        <LinkCard key={link.id} link={link} />
      ))}
    </div>
  );
};
