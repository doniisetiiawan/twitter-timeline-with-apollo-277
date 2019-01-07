import { GraphQLScalarType } from 'graphql';

import TweetModel from '../model/Tweet';

export const resolvers = {
  Query: {
    getTweet: _id => TweetModel.getTweet(_id),
    getTweets: () => TweetModel.getTweets(),
  },
  Mutation: {
    createTweet: (_, args) => TweetModel.createTweet(args),
    deleteTweet: (_, args) => TweetModel.deleteTweet(args),
    updateTweet: (_, args) => TweetModel.updateTweet(args),
  },
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'Date custom scalar type',
    serialize: value => value,
    parseValue: () => new Date(),
    parseLiteral: ast => ast.value,
  }),
};
