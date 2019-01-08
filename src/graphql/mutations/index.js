import gql from 'graphql-tag';

export const MUTATION_CREATE_TWEET = gql`
mutation createTweet(
  $tweet: String,
  $author: String,
  $createdAt: DateTime
) {
  createTweet(
    tweet: $tweet,
    author: $author,
    createdAt: $createdAt
) {
    _id
    tweet
    author
    createdAt
  }
}
`;

export const MUTATION_DELETE_TWEET = gql`
mutation deleteTweet($_id: String!) {
  deleteTweet(
    _id: $_id
) {
    _id
    tweet
    author
    createdAt
  }
}
`;

export const MUTATION_UPDATE_TWEET = gql`
mutation updateTweet(
  $_id: String!,
  $tweet: String!
) {
  updateTweet(
    _id: $_id,
    tweet: $tweet
) {
    _id
    tweet
    author
    createdAt
  }
}
`;
