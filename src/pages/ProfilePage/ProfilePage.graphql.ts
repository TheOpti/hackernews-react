import { gql } from '@apollo/client';

export const USER_QUERY = gql`
  query getUser($id: String!) {
    user(id: $id) {
      id
      name
      email
      createdAt
      links {
        id
        title
        numberOfComments
        numberOfVotes
        createdAt
        url
      }
      votes {
        link {
          title
          numberOfComments
          numberOfVotes
          createdAt
          url
        }
      }
      bio
    }
  }
`;
