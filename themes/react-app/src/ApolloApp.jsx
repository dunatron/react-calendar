import React from 'react';
/**
 * Get GraphQL endpoint
 */
import GraphQLConfig from './config/GraphQLConfig';
let BASE_URL = BASE_URL_VARIABLE;
let SiteGraphqlConfig = new GraphQLConfig(BASE_URL);
let GRAPHQL_ENDPOINT = SiteGraphqlConfig.getGraphqlEndPoint();
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink, concat } from 'apollo-link';
import { connect } from 'react-redux';
import App from './App';
import TestLayout from './components/TestLayout';
import moment from 'moment';
import {BrowserRouter} from 'react-router-dom'

import store from './state/store';

// let date = new Date(), y = date.getFullYear(), m = date.getMonth();
// let firstDay = new Date(y, m, 1);
// let lastDay = new Date(y, m + 1, 0);
//
// firstDay = moment(firstDay).format(yourFormat);
// lastDay = moment(lastDay).format(yourFormat);


const getMonthDateRange = (year, month) =>{

  // month in moment is 0 based, so 9 is actually october, subtract 1 to compensate
  // array is 'year', 'month', 'day', etc
  let startDate = moment([year, month - 1]);

  // Clone the value before .endOf()
  let endDate = moment(startDate).endOf('month');

  // just for demonstration:
  console.log(startDate.toDate());
  console.log(endDate.toDate());

  // make sure to call toDate() for plain JavaScript date type
  return { start: startDate, end: endDate };
};

const currentDate = moment();
const DateRange = getMonthDateRange(currentDate.year(), currentDate.getMonth);
console.log(DateRange);

// Lets play with Immutable JS

console.group('Lets play with Immutable JS');

let a = [0,1,2];

let b = a.filter((val) => val !== 2);

console.log(a);
console.log(b);
console.log(a.concat(3))
console.log(a.concat(4))

console.groupEnd();


let date = new Date(),
  y = date.getFullYear(),
  m = date.getMonth();

let firstDay = new Date(y, m, 1);
let lastDay = new Date(y, m + 1, 0);

firstDay = moment(firstDay).format('YYYY-MM-DD hh:mm');

lastDay = moment(lastDay).format('YYYY-MM-DD hh:mm');

const startOfMonth = moment().startOf('month').format('YYYY-MM-DD hh:mm');
const endOfMonth   = moment().endOf('month').format('YYYY-MM-DD hh:mm');




const httpLink = new HttpLink({ uri: GRAPHQL_ENDPOINT });
const createAuthMiddleware = (token) => new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  if (token) {
    operation.setContext({
      headers: {
        Authorization: 'Bearer ' + token,
      }
    });
  }
  return forward(operation);
});

const createClient = (token) => new ApolloClient({
  link: concat(createAuthMiddleware(token), httpLink),
  cache: new InMemoryCache({
    dataIdFromObject: (o) => {
      if (o.ID >= 0 && o.__typename) {
        return `${o.__typename}:${o.ID}`;
      }
      return null;
    },
  }),
});
const client = createClient(localStorage.getItem('jwt'));

const ApolloApp = ({ token }) => (
  <BrowserRouter>
    <ApolloProvider client={client} store={store}>
      <App startDate={startOfMonth} endDate={endOfMonth} />
      {/*<TestLayout />*/}
    </ApolloProvider>
  </BrowserRouter>
);

export default connect(
  (state) => ({
    token: state.token
  })
)(ApolloApp);
