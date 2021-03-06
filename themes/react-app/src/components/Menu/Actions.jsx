import React, { Component } from "react"
import PropTypes from "prop-types"
import { withStyles } from "material-ui/styles"
import IconButton from "material-ui/IconButton"
import DateRangeIcon from "material-ui-icons/DateRange"
import Tooltip from "material-ui/Tooltip"
import SettingIcon from "material-ui-icons/Settings"
import AddCircleIcon from "material-ui-icons/AddCircleOutline"
import SearchIcon from "material-ui-icons/Search"
import FilterListIcon from "material-ui-icons/FilterList"
import Loader from "../Loader"
import LoginModal from "../Modals/LoginModal"
import { Link } from "react-router-dom"
import { FormattedMessage } from "react-intl"
import { withApollo } from "react-apollo"
import { compose, gql, graphql } from "react-apollo/index"
import { searchEvents } from "../../actions/searchEventActions"
// Connect Redux
import { connect } from "react-redux"
import { updateActionBarStatus } from "../../actions/settingsActions"
import { setLanguage } from "../../actions/locale"
import {
  setUserName,
  setUserAge,
  setToken,
  setValidateTokenProps,
  refreshTokenProps,
  logoutUser,
} from "../../actions/userActions"
import messages from "../../messages/components/Actions"
// Drawers
import FilterDrawer from "./FilterDrawer"
import SettingsDrawer from "./SettingsDrawer"

const drawerWidth = 240
const styles = theme => ({
  root: {
    color: theme.palette.primary.main,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    position: "absolute",
    height: "100%",
    width: drawerWidth,
  },
  ActionsWrapper: {
    display: "flex",
    flex: "1",
    "align-items": "center",
    "justify-content": "center",
    minHeight: `${theme.spec.menuDesktopHeight}px`,
  },
  FixedActionsWrapper: {
    display: "flex",
    flex: "1",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.palette.primary.contrastText,
    minHeight: `${theme.spec.menuDesktopHeight}px`,
    position: "fixed",
    top: 0,
    zIndex: 800,
    flexDirection: "column",
  },
  loadingWrapper: {
    display: "flex",
    flex: "1",
    "align-items": "center",
    "justify-content": "center",
    minHeight: `${theme.spec.menuDesktopHeight}px`,
    "flex-direction": "column-reverse",
  },
  Button: {
    height: "42px",
  },
  loadingText: {
    "font-size": "12px",
  },
  card: {
    display: "flex",
    width: "15em",
    height: "19em",
    flex: "1 1 auto", // flex-grow, flex-shrink, flex-basis
    "flex-wrap": "wrap",
    margin: "10px",
    overflow: "-webkit-paged-x",
  },
  media: {
    height: 200,
  },
  cardContent: {
    height: "80%",
    width: "100%",
    overflow: "hidden",
  },
  cardActions: {
    height: "20%",
  },
  categoryCircle: {
    height: "15px",
    width: "15px",
    "border-radius": "15px",
    margin: "8px",
  },
  categoryComponent: {
    display: "flex",
    "align-items": "center",
  },
  paper: {
    height: "auto",
    width: "auto",
    margin: "1.2em",
    padding: "1.2em",
    "text-align": "center",
    display: "inline-block",
  },
  // MuiPaper: {
  //   'transform': 'translateX(-408.828px)',
  // },
  paperAnchorDockedLeft: {
    display: "none",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  searchFormControl: {
    display: "flex",
    "max-width": "420px",
    width: "100%",
    "margin-left": "auto",
    "margin-right": "auto",
  },
  searchBar: {
    display: "flex",
    padding: "15px",
  },
  searchText: {
    color: "black",
  },
  actionIcon: {
    color: theme.palette.primary.main,
  },
  closeFilterIcon: {
    color: theme.palette.secondary.main,
  },
})

class Actions extends Component {
  constructor(props) {
    super(props)

    this.state = {
      modalIsOpen: false,
      loginModalIsOpen: false,
      filterDraw: false, // left
      searchDraw: false, // top
      settingsDraw: false, // right
      openSecondary: true,
      actionsIsFixed: false,
      loading: true,
    }

    // this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)

    this.openLoginModal = this.openLoginModal.bind(this)
    this.afterOpenLoginModal = this.afterOpenLoginModal.bind(this)
    this.closeLoginModal = this.closeLoginModal.bind(this)
  }

  componentWillMount() {
    // this._validateToken()
    // This will keep validating
    //LOL below solution was because I thought I was implementing refreshToken. We should always validate Token when we launch our application.
    // This settings container will contain all the user actions, so validatingToken when component mounts gives them access
    // A better idea is to have a refresh token button
    // Then we can pass down loggedIn as a prop to components and if it is false, for any user actions we will render either launch login button,
    // which would launch login Modal. Or a refresh Token Or login as someone else. Call It LoginButton which will be its own we container.
    // It will either display a Login button or a set of buttons {loginAsSomeoneElse, refreshToken}
  }

  componentDidMount = () => {
    window.addEventListener("scroll", this.handleScroll2)
  }

  componentWillUnmount = () => {
    window.removeEventListener("scroll", this.handleScroll2)
  }

  handleScroll2 = event => {
    // Save the element we're wanting to scroll
    var el = document.querySelector("#target")
    var pageY = window.scrollY
    //  If  we've scrolled past the height of the element, add a class
    if (el.getBoundingClientRect().bottom <= 0) {
      this.props.updateActionBarStatus(true)
      //  If we've scrolled back up to  the top of the container, remove the class
    } else if (pageY == 0) {
      this.props.updateActionBarStatus(false)
    }
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    })
  }

  openModal() {
    this.setState({ modalIsOpen: true })
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00"
  }

  closeModal() {
    console.log("Trying To close the Modal ")
    this.setState({ modalIsOpen: false })
  }

  openLoginModal() {
    console.log("openLoginModal")
    this.setState({ loginModalIsOpen: true })
    this.toggleDrawer("settingsDraw", false)
  }

  closeLoginModal() {
    this.setState({ loginModalIsOpen: false })
  }

  afterOpenLoginModal() {
    this.toggleDrawer("settingsDraw", false)
  }

  handleSearch = () => {
    // 1. Put search into loading mode
    this.props.dispatch(searchEvents(this.state.searchText))

    // 2. call search events function
    this.searchEvents(this.state.searchText).then(() => {})

    this.props.history.push(`/`)
  }

  _logout = async () => {
    localStorage.removeItem("USER_ID")
    localStorage.removeItem("AUTH_TOKEN")
    localStorage.removeItem("jwt")
    this.props.logoutUser()
    // ToDO : this for whatever reason is not working
    // this.forceUpdate()
    // this.props.history.push(`/`)
  }

  _validateToken = async () => {
    console.log("this.props.client ", this.props.client)
    const res = await this.props.client.query({
      query: VALIDATE_TOKEN_QUERY,
    })
    const { data } = res
    const { validateToken } = data
    const { Code, Message, Valid } = validateToken
    console.log("validate token res ", res)
    console.log("WILL SET THESE PROPS -> ", validateToken)
    this.props.setValidateTokenProps(validateToken)
    this.setState({
      loading: false,
    })
    console.log("FINISHED VALIDATE TOKEN FUNCTION")
  }

  _refreshToken = async () => {
    // const res = await this.props.refreshTokenMutation({
    //   variables: {
    //     token: null
    //   },
    // })
    const res = await this.props.refreshTokenMutation()
    const { data } = res
    const { refreshToken } = data
    const { Email, FirstName, Surname, Token } = refreshToken
    console.log("REFRESH TOKEN RES", res)
    this.props.refreshTokenProps(refreshToken)
  }

  render() {
    const {
      classes,
      isMobileDevice,
      windowHeight,
      actionsBarIsFixed,
      user,
    } = this.props

    const { filterDraw, loading } = this.state

    // Umm can we have it validating when component mounts more explecitly? so it is not in the render method
    // It should be called when it is created, trying to get token from local storage.
    // That way we can store the token in the redux store, or a simple loggedIn: true
    // const {
    //   data: { validateToken, loading },
    // } = this.props
    // if (loading) {
    //   return (
    //     <Loader loadingText={"applying settings"} size={20} fontSize={12} />
    //   )
    // }

    // Loading props will now come from the redux store

    console.log("Actions.jsx State ", this.state)

    console.log("Ok Actions will become a container I think")

    return (
      <div
        className={
          actionsBarIsFixed
            ? classes.FixedActionsWrapper
            : classes.ActionsWrapper
        }
        id="target">
        <FormattedMessage
          {...messages.rowError}
          values={{
            error: "Fuck Off error",
          }}
        />
        <FormattedMessage id="test.Title" defaultMessage={"some default"} />

        <a role="button" onClick={() => this.props.setLanguage("en")}>
          EN
        </a>
        <a role="button" onClick={() => this.props.setLanguage("ru")}>
          RU
        </a>
        <Link to="/">
          <Tooltip id="tooltip-all-links" placement="top" title="main calendar">
            <IconButton
              aria-label=""
              className={classes.actionIcon}
              color="primary">
              <DateRangeIcon />
            </IconButton>
          </Tooltip>
        </Link>
        <Link to="/search">
          <Tooltip id="tooltip-all-links" placement="top" title="search area">
            <IconButton
              aria-label="Search for events"
              className={classes.actionIcon}
              color="primary">
              <SearchIcon />
            </IconButton>
          </Tooltip>
        </Link>
        <Link to="/create">
          <Tooltip
            id="tooltip-all-links"
            placement="top"
            title="create new event">
            <IconButton
              aria-label="Create new events"
              className={classes.actionIcon}
              color="primary">
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
        </Link>
        <IconButton
          aria-label="Filter tags for events"
          className={classes.actionIcon}
          onClick={this.toggleDrawer("filterDraw", !this.state.filterDraw)}
          color="primary">
          <FilterListIcon />
        </IconButton>
        <IconButton
          aria-label="Settings for application"
          className={classes.actionIcon}
          onClick={this.toggleDrawer("settingsDraw", !this.state.settingsDraw)}
          color="primary">
          <SettingIcon />
        </IconButton>
        <FilterDrawer
          actionsBarIsFixed={actionsBarIsFixed}
          height={windowHeight}
          isOpen={this.state.filterDraw}
          close={this.toggleDrawer("filterDraw", false)}
        />
        <SettingsDrawer
          isOpen={this.state.settingsDraw}
          close={this.toggleDrawer("settingsDraw", false)}
          logout={() => this._logout()}
          openLoginModal={this.openLoginModal}
          username={this.props.user.username}
          tokenProps={this.props.user.tokenProps}
          refreshToken={() => this._refreshToken()}
        />
        <LoginModal
          isOpen={this.state.loginModalIsOpen}
          close={this.closeLoginModal}
        />
      </div>
    )
  }
}
export const VALIDATE_TOKEN_QUERY = gql`
  query validateToken {
    validateToken {
      Valid
      Message
      Code
    }
  }
`

const REFRESH_TOKEN_MUTATION = gql`
  mutation refreshToken {
    refreshToken {
      FirstName
      Surname
      Email
      Token
    }
  }
`

Actions.propTypes = {
  setLanguage: PropTypes.func.isRequired,
}

const reduxWrapper = connect(
  state => ({
    actionsBarIsFixed: state.settings.actionsBarIsFixed,
    windowWidth: state.settings.windowWidth,
    windowHeight: state.settings.windowHeight,
    isMobileDevice: state.settings.isMobileDevice,
    user: state.user,
  }),
  dispatch => ({
    setLanguage: language => dispatch(setLanguage(language)),
    updateActionBarStatus: status => dispatch(updateActionBarStatus(status)),
    setValidateTokenProps: props => dispatch(setValidateTokenProps(props)),
    logoutUser: () => dispatch(logoutUser()),
    refreshTokenProps: props => dispatch(refreshTokenProps(props)),
  })
)

export default compose(
  withApollo,
  reduxWrapper,
  // graphql(REFRESH_TOKEN_MUTATION, { name: "refreshTokenMutation" }),
  withStyles(styles)
)(Actions)
