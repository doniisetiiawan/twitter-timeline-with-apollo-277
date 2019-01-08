/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import Mutation from '../shared/components/Mutation';

import CodejobsAvatar from './download.svg';

import { MUTATION_CREATE_TWEET } from '../graphql/mutations';
import { QUERY_GET_TWEETS } from '../graphql/queries';

class CreateTweet extends Component {
  state = {
    tweet: '',
  };

  handleChange = (e) => {
    const { target: { value } } = e;

    this.setState({
      tweet: value,
    });
  };

  handleSubmit = (mutation) => {
    const tweet = this.state.tweet;
    const author = '@codejobs';
    const createdAt = new Date();

    mutation({
      variables: {
        tweet,
        author,
        createdAt,
      },
    });
  };

  render() {
    return (
      <Mutation
        mutation={MUTATION_CREATE_TWEET}
        query={QUERY_GET_TWEETS}
        onCompleted={() => {
          this.setState({
            tweet: '',
          });
        }}
      >
        {createTweet => (
          <div className="createTweet">
            <header>
              Write a new Tweet
            </header>

            <section>
              <img src={CodejobsAvatar} alt="Codejobs" />

              <textarea
                placeholder="Write your tweet here..."
                value={this.state.tweet}
                onChange={this.handleChange}
              />
            </section>

            <div className="publish">
              <button
                type="button"
                onClick={() => {
                  this.handleSubmit(createTweet);
                }}
              >
                Tweet it!
              </button>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}

export default CreateTweet;
