import React, { Component } from "react"
import { withApollo } from "react-apollo"
import { gql, graphql, compose } from "react-apollo"
import "./sass/App.scss"
// Connect Redux
import { updateLogo } from "./actions/settingsActions"
import Loader from "./components/Loader"
import DynamicTheme from "./dynamicTheme"
import { MuiThemeProvider } from "material-ui/styles"
import MomentUtils from "material-ui-pickers/utils/moment-utils"
import MuiPickersUtilsProvider from "material-ui-pickers/utils/MuiPickersUtilsProvider"
import App from "./App"
import { connect } from "react-redux"
// import { APP_SETTINGS_QUERY } from "./queries"
// import APP_SETTINGS_QUERY from "./queries/appSettingsQuery"

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
`

class AppSettings extends Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.data.loading !== this.props.data.loading
  }

  fetchAppSettings = async () => {
    await this.props.client
      .query({
        query: APP_SETTINGS_QUERY,
      })
      .then(res => {
        // 3. Events have been updated and loading mode will be false
        // this.props.storeAllEvents(res.data.getEventsBetween)
        // this.props.filterEvents()
        console.log("Res ", res)
        // const AppSettings = getAppSettings[0]
        // const { HappLogo, ClientLogo } = AppSettings
        // const dynamicTheme = DynamicTheme(AppSettings)
        // this.props.logoUpdate("happLogo", HappLogo)
        // this.props.logoUpdate("clientLogo", ClientLogo)
      })
  }

  componentWillMount() {
    this.fetchAppSettings()
  }

  render() {
    // const {
    //   data: { loading, getAppSettings },
    // } = this.props

    // if (loading) {
    //   return <Loader loadingText={"Securing App"} size={40} fontSize={22} />
    // }

    console.log("APP SETTINGS PROPS ", this.props)
    // Get app settings from query and apply to MUITheme
    // const AppSettings = getAppSettings[0]
    // const { HappLogo, ClientLogo } = AppSettings
    let HappLogo, ClientLogo
    const dynamicTheme = DynamicTheme(AppSettings)

    this.props.logoUpdate("happLogo", HappLogo)
    this.props.logoUpdate("clientLogo", ClientLogo)

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
)
export default compose(
  withApollo,
  reduxWrapper
  // graphql(APP_SETTINGS_QUERY)
  // graphql(APP_SETTINGS_QUERY, { name: "appSettingsQuery" })
)(AppSettings)
