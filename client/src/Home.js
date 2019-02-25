import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_USERS = gql`
  {
    users {
      id
      username
    }
  }
`;

export default props => {
  return (
    <Query query={GET_USERS}>
      {({ loading, error, data }) => {
        if (loading) return 'Loading';
        if (error) return 'Error';
        console.log('data', data);
        return (
          <div>
            <ul>
              {data.users.map(item => (
                <li>
                  <p>{item.id}</p>
                  <p>{item.username}</p>
                </li>
              ))}
            </ul>
          </div>
        );
      }}
    </Query>
  );
};
