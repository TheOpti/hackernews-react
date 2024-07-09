import { gql } from '@apollo/client';

export const FEED_QUERY = gql`
  query {
    feed {
      id
      title
      url
      numberOfComments
      numberOfVotes
      postedBy {
        id
        name
      }
      createdAt
    }
  }
`;
