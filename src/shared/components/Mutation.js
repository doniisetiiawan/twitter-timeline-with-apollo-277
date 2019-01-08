/* eslint-disable react/forbid-prop-types,react/jsx-filename-extension */
import React from 'react';
import PropTypes from 'prop-types';
import { Mutation as ApolloMutation } from 'react-apollo';

const Mutation = (props) => {
  const {
    mutation,
    query,
    children,
    onCompleted,
  } = props;

  return (
    <ApolloMutation
      mutation={mutation}
      update={(cache, { data }) => {
        const {
          definitions: [{ name: { value: mutationName } }],
        } = mutation;
        const {
          definitions: [{ name: { value: queryName } }],
        } = query;

        const cachedData = cache.readQuery({ query });

        const current = data[mutationName];

        let updatedData = [];

        const mutationNameLC = mutationName.toLowerCase();

        if (mutationNameLC.includes('delete') || mutationNameLC.includes('remove')) {
          updatedData = cachedData[queryName].filter(
            row => row._id !== current._id,
          );
        } else if (mutationNameLC.includes('create') || mutationNameLC.includes('add')) {
          updatedData = [current, ...cachedData[queryName]];
        } else if (mutationNameLC.includes('edit') || mutationNameLC.includes('update')) {
          const index = cachedData[queryName].findIndex(
            row => row._id === current._id,
          );
          cachedData[queryName][index] = current;
          updatedData = cachedData[queryName];
        }

        cache.writeQuery({
          query,
          data: {
            [queryName]: updatedData,
          },
        });
      }}
      onCompleted={onCompleted}
    >
      {children}
    </ApolloMutation>
  );
};

Mutation.propTypes = {
  children: PropTypes.node.isRequired,
  mutation: PropTypes.func.isRequired,
  onCompleted: PropTypes.func.isRequired,
  query: PropTypes.object.isRequired,
};

export default Mutation;
