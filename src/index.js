/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { render } from 'react-dom';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import App from './App';
import './index.css';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
});

const AppContainer = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

const root = document.getElementById('root');

render(<AppContainer />, root);
