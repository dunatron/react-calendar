
import './index.css';


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import store from './state/store';
import { Provider as Redux } from 'react-redux';
import ApolloApp from './ApolloApp';
import customTheme from "./theme";
import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
const theme = createMuiTheme(customTheme);

ReactDOM.render(
  <Redux store={store}>
    <MuiThemeProvider theme={theme}>
      <ApolloApp />
    </MuiThemeProvider>
  </Redux>,
  document.getElementById('react-root')
);
registerServiceWorker();
