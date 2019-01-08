/* eslint-disable react/jsx-filename-extension */
import React from 'react';

import Tweet from './Tweet';
import CreateTweet from './CreateTweet';
import Query from '../shared/components/Query';

import { QUERY_GET_TWEETS } from '../graphql/queries';

import './Tweets.css';

const Tweets = () => (
  <div className="tweets">
    <CreateTweet />
    <Query query={QUERY_GET_TWEETS} render={Tweet} />
  </div>
);

export default Tweets;
