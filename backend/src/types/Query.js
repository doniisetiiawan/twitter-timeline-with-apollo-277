export const typeDefs = [`
scalar DateTime

type Tweet {
  _id: String
  tweet: String
  author: String
  createdAt: DateTime
}

type Query {
  getTweet(_id: String): Tweet
  getTweets: [Tweet]
}

type Mutation {
  createTweet(
    tweet: String,
    author: String,
    createdAt: DateTime
  ): Tweet

  deleteTweet(_id: String): Tweet
  
  updateTweet(
    _id: String!,
    tweet: String!
  ): Tweet
}

schema {
  query: Query
  mutation: Mutation
}
`];
