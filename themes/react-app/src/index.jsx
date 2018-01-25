import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';
import './index.css';
import App from './App';
import GraphQLConfig from './config/GraphQLConfig';
import { gql, graphql, compose } from 'react-apollo';

/**
 * Get GraphQL endpoint
 */
let BASE_URL = BASE_URL_VARIABLE;
let SiteGraphqlConfig = new GraphQLConfig(BASE_URL);
let GRAPHQL_ENDPOINT = SiteGraphqlConfig.getGraphqlEndPoint();
let clone = require('clone');

/**
 * ToDo: When we build our project we need to hit and query our graphQL endpoint.
 * We need this for fragment and union matching as it needs to know our schema.
 * So this little function will need to somehow hit our endpoint and create A JSON File for our bundle to use
 */

/**
 * configure network interface for apollo client
 * ToDo: get fragment and union matching to work
 */
const networkInterface = createNetworkInterface({
  //uri: 'http://my-app.local/graphql'
  uri: GRAPHQL_ENDPOINT
});

/**
 * configure apollo client to use for ApolloProvider component
 * @type {ApolloClient | ApolloClient<any>}
 */
const client = new ApolloClient({
  networkInterface: networkInterface
});

/**
 * Render our app at given element
 * currently found in ReactPage.ss
 */
ReactDOM.render(
  <ApolloProvider client={client}>
    <App theCient={client} />
  </ApolloProvider>,
  document.getElementById('react-root')
);
