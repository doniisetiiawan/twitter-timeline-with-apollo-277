/* eslint-disable react/forbid-prop-types,react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import { Query as ApolloQuery } from 'react-apollo';

const Query = (props) => {
  const {
    query,
    render: Component,
  } = props;

  return (
    <ApolloQuery query={query}>
      {({ loading, error, data }) => {
        if (loading) {
          return <p>Loading...</p>;
        }

        if (error) {
          return <p>Query Error: {error}</p>;
        }

        return <Component data={data || false} />;
      }}
    </ApolloQuery>
  );
};

Query.propTypes = {
  render: PropTypes.node.isRequired,
  query: PropTypes.object.isRequired,
};

export default Query;
