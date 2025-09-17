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
      votes {
        id
        user {
          id
          name
        }
      }
    }
  }
`;
