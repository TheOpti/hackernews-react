import { gql } from '@apollo/client';

export const VOTE_MUTATION = gql`
  mutation vote($linkId: ID!) {
    vote(linkId: $linkId) {
      id
      user {
        id
      }
    }
  }
`;

export const UPDATE_LINK_VOTES_FRAGMENT = gql`
  fragment UpdateLinkVotes on Link {
    id
    numberOfVotes
    votes {
      id
      user {
        id
      }
    }
  }
`;
