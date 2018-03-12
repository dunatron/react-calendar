import React, {Component} from 'react';

import {gql, graphql, compose} from 'react-apollo';
import './sass/App.scss';
// Connect Redux
import Loader from './components/Loader';
import DynamicTheme from "./dynamicTheme";
import {MuiThemeProvider} from 'material-ui/styles';
import App from './App';

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
    const {data: { loading, getAppSettings}} = this.props;

    if (loading) {
      return <Loader loadingText={'Securing App'} size={40} fontSize={22}/>;
    }

    // Get app settings from query and apply to MUITheme
    const AppSettings = getAppSettings[0];
    const {HappLogo, ClientLogo} = AppSettings;
    const dynamicTheme = DynamicTheme(AppSettings);

    return (
      <MuiThemeProvider theme={dynamicTheme}>
        <App clientLogo={ClientLogo} happLogo={HappLogo} />
      </MuiThemeProvider>
    )
  }
}


export default compose(
  graphql(APP_SETTINGS_QUERY),
)(AppSettings);