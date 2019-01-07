import express from 'express';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';
import { makeExecutableSchema } from 'graphql-tools';

import { typeDefs } from './types/Query';
import { resolvers } from './types/Resolvers';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();
const port = 5000;

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
