import { gql } from '@apollo/client';

export const FEED_QUERY = gql`
  query {
    feed {
      id
      title
      description
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
