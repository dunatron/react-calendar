import React, { Component } from 'react';

import { gql, graphql, compose } from 'react-apollo';
import './sass/App.scss';
// Connect Redux
import { updateLogo } from './actions/settingsActions';
import Loader from './components/Loader';
import DynamicTheme from "./dynamicTheme";
import { MuiThemeProvider } from 'material-ui/styles';
import MomentUtils from 'material-ui-pickers/utils/moment-utils';
import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
import App from './App';
import { connect } from "react-redux";

const APP_SETTINGS_QUERY = gql`  
  query getAppSettings {
	getAppSettings {
    PCMain
    PCLight
    PCDark
    SCMain
    SCLight
    SCDark
    PCContrast
    SCContrast
    ClientLogo
    HappLogo
  }
}
`;

class AppSettings extends Component {

  shouldComponentUpdate(nextProps) {
    return (nextProps.data.loading !== this.props.data.loading);
  }

  render() {
    const { data: { loading, getAppSettings } } = this.props;

    if (loading) {
      return <Loader loadingText={'Securing App'} size={40} fontSize={22} />;
    }

    // Get app settings from query and apply to MUITheme
    const AppSettings = getAppSettings[0];
    const { HappLogo, ClientLogo } = AppSettings;
    const dynamicTheme = DynamicTheme(AppSettings);

    this.props.logoUpdate('happLogo', HappLogo);
    this.props.logoUpdate('clientLogo', ClientLogo);

    return (
      <MuiThemeProvider theme={dynamicTheme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <App />
        </MuiPickersUtilsProvider>
      </MuiThemeProvider>
    )
  }
}

const reduxWrapper = connect(
  null, // don't listen to store
  dispatch => ({
    logoUpdate: (type, url) => dispatch(updateLogo(type, url)),
  })
);
export default compose(
  reduxWrapper,
  graphql(APP_SETTINGS_QUERY),
)(AppSettings);
