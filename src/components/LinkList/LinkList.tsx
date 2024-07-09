import { useQuery } from '@apollo/client';

import { LinkCard } from '../LinkCard/LinkCard';
import { FEED_QUERY } from './LinkList.graphql';

import classes from './LinkList.module.css';

export const LinkList = () => {
  const { data, loading, error } = useQuery(FEED_QUERY);

  if (loading) {
    return 'Loading...';
  }

  if (!data) {
    return 'No data';
  }

  if (error) {
    return 'There was an error';
  }

  return (
    <div className={classes.linkList} data-testid="link-list">
      {data.feed.map((link: any) => (
        <LinkCard key={link.id} link={link} />
      ))}
    </div>
  );
};
