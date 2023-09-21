import { gql } from '@apollo/client';

export const FEED_QUERY = gql`
  query {
    feed {
      id
      description
      url
      votes {
        id
      }
      postedBy {
        id
        name
      }
    }
  }
`;
