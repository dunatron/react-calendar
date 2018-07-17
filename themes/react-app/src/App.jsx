import React, { Component } from "react"
import CalendarMenu from "./components/CalendarMenu"
// styles
import { withStyles } from "material-ui/styles"

// Connect Redux
import { compose } from "react-apollo"
import { connect } from "react-redux"
import { updateDimensions } from "./actions/settingsActions"
// Internationalization
import LanguageProvider from "./components/LanguageProvider"
// router
import { BrowserRouter, Route, Switch } from "react-router-dom"
import "./sass/App.scss"
// pages/containers
import CalendarBodyContainer from "./containers/CalendarBodyContainer"
import CreateEventContainer from "./containers/CreateEventContainer"
import SearchContainer from "./containers/SearchContainer"

const styles = {
  Calendar: {
    width: "100%",
    height: "100%",
  },
  card: {
    minWidth: "min-content",
    maxWidth: "300px",
    "flex-shrink": "0",
    margin: "10px",
  },
  media: {
    height: 200,
  },
}

class App extends Component {
  updateDimensions = () => {
    let width = window.innerWidth
    let height = window.innerHeight
    this.props.updateDimensions(width, height)
  }

  componentDidMount = () => {
    window.addEventListener("resize", this.updateDimensions)
    this.updateDimensions()
  }

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateDimensions)
  }

  render() {
    const { classes, windowWidth, actionsBarIsFixed, locale } = this.props
    const { language } = locale
    return (
      <LanguageProvider locale={this.props.locale.language}>
        <BrowserRouter>
          <div className={classes.Calendar}>
            <CalendarMenu />
            <div
              style={
                actionsBarIsFixed
                  ? { paddingLeft: "50px", height: "inherit" }
                  : { height: "inherit" }
              }>
              <Switch>
                <Route exact path="/" component={CalendarBodyContainer} />
                <Route exact path="/create" component={CreateEventContainer} />
                <Route exact path="/search" component={SearchContainer} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </LanguageProvider>
    )
  }
}

const reduxWrapper = connect(
  state => ({
    windowWidth: state.settings.windowWidth,
    windowHeight: state.settings.windowHeight,
    actionsBarIsFixed: state.settings.actionsBarIsFixed,
    locale: state.locale,
  }),
  dispatch => ({
    updateDimensions: (width, height) =>
      dispatch(updateDimensions(width, height)),
    // getEventData: (id, title) => dispatch(getSingleEventFulfilled(id, title)),
  })
)

export default compose(
  reduxWrapper,
  withStyles(styles)
)(App)
