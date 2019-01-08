/* eslint-disable react/jsx-filename-extension,react/prop-types */
import React, { Component } from 'react';
import moment from 'moment';

import Mutation from '../shared/components/Mutation';

import {
  MUTATION_DELETE_TWEET,
  MUTATION_UPDATE_TWEET,
} from '../graphql/mutations';

import { QUERY_GET_TWEETS } from '../graphql/queries';

import TwitterLogo from './download.svg';
import CodejobsAvatar from './download.svg';

class Tweet extends Component {
  state = {
    currentTweet: false,
  };

  handleChange = (value, _id) => {
    const { currentTweet } = this.state;

    currentTweet[_id] = value;

    this.setState({
      currentTweet,
    });
  };

  handleUpdateTweet = (mutation, value, _id) => {
    mutation({
      variables: {
        _id,
        tweet: value,
      },
    });
  };

  handleEditTweet = (_id) => {
    const { data: { getTweets: tweets } } = this.props;

    const selectedTweet = tweets.find(tweet => tweet._id === _id);

    const currentTweet = {
      [_id]: selectedTweet.tweet,
    };

    this.setState({
      currentTweet,
    });
  };

  handleDeleteTweet = (mutation, _id) => {
    mutation({
      variables: {
        _id,
      },
    });
  };

  render() {
    const { data: { getTweets: tweets } } = this.props;
    const { currentTweet } = this.state;

    return tweets.map(({
      _id,
      tweet,
      author,
      createdAt,
    }) => (
      <div className="tweet" key={`tweet-${_id}`}>
        <div className="author">
          <img src={CodejobsAvatar} alt="Codejobs" />

          <strong>{author}</strong>
        </div>
        <div className="content">
          <div className="twitter-logo">
            <img src={TwitterLogo} alt="Twitter" />
          </div>

          {!currentTweet[_id]
            ? tweet
            : (
              <Mutation
                mutation={MUTATION_UPDATE_TWEET}
                query={QUERY_GET_TWEETS}
                onCompleted={() => {
                  this.setState({
                    currentTweet: false,
                  });
                }}
              >
                {updateTweet => (
                  <textarea
                    className="editTextarea"
                    value={currentTweet[_id]}
                    onChange={(e) => {
                      this.handleChange(
                        e.target.value,
                        _id,
                      );
                    }}
                    onBlur={(e) => {
                      this.handleUpdateTweet(
                        updateTweet,
                        e.target.value,
                        _id,
                      );
                    }}
                  />
                )}
              </Mutation>
            )
        }
        </div>

        <div className="date">
          {moment(createdAt).format('MMM DD, YYYY')}
        </div>

        <div
          className="edit"
          onClick={() => {
            this.handleEditTweet(_id);
          }}
        >
          <i className="fa fa-pencil" aria-hidden="true" />
        </div>

        <Mutation
          mutation={MUTATION_DELETE_TWEET}
          query={QUERY_GET_TWEETS}
        >
          {deleteTweet => (
            <div
              className="delete"
              onClick={() => {
                this.handleDeleteTweet(deleteTweet, _id);
              }}
            >
              <i className="fa fa-trash" aria-hidden="true" />
            </div>
          )}
        </Mutation>
      </div>
    ));
  }
}

export default Tweet;
