import { gql } from '@apollo/client';

export const VOTE_MUTATION = gql`
  mutation vote($linkId: ID!) {
    vote(linkId: $linkId) {
      id
    }
  }
`;
