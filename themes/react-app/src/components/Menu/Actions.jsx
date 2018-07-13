import React, { Component } from "react"
import { withStyles } from "material-ui/styles"
import Button from "material-ui/Button"
import Paper from "material-ui/Paper"
import ReactModal from "react-modal"
import IconButton from "material-ui/IconButton"
import DateRangeIcon from "material-ui-icons/DateRange"
import Tooltip from "material-ui/Tooltip"
import SettingIcon from "material-ui-icons/Settings"
import AddCircleIcon from "material-ui-icons/AddCircleOutline"
import SearchIcon from "material-ui-icons/Search"
import FilterListIcon from "material-ui-icons/FilterList"
import CloseIcon from "material-ui-icons/Close"
import Loader from "../Loader"
import CategoriesList from "../../containers/CategoriesListContainer"
import LoginForm from "../Login"
import LoginModal from "../Modals/LoginModal"
import { Link } from "react-router-dom"

import { Drawer, MenuItem } from "material-ui"
import { compose, gql, graphql } from "react-apollo/index"
import store from "../../state/store"
import { searchEvents } from "../../actions/searchEventActions"
// Connect Redux
import { connect } from "react-redux"
import { updateActionBarStatus } from "../../actions/settingsActions"
import { setUserName, setUserAge, setToken } from "../../actions/userActions"
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
    }

    // this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this)
    this.closeModal = this.closeModal.bind(this)

    this.openLoginModal = this.openLoginModal.bind(this)
    this.afterOpenLoginModal = this.afterOpenLoginModal.bind(this)
    this.closeLoginModal = this.closeLoginModal.bind(this)
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
      // this.setState({
      //   actionsIsFixed: true,
      // })
      this.props.updateActionBarStatus(true)

      //  If we've scrolled back up to  the top of the container, remove the class
    } else if (pageY == 0) {
      // this.setState({
      //   actionsIsFixed: false,
      // })
      this.props.updateActionBarStatus(false)
    }
  }

  // shouldComponentUpdate = () => {
  //
  // };

  toggleDrawer = (side, open) => () => {
    // console.log("Update Side ", side, open)
    console.group("toggleDrawer")
    console.log("side -> ", side)
    console.log("open -> ", open)
    console.groupEnd()
    this.setState({
      [side]: open,
    })
    // this.setState({
    //   [side]: open,
    // })
    // this.setState({
    //   filterDraw: open,
    // })
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
    // ToDO : this for whatever reason is not working
    this.forceUpdate()
    // this.props.history.push(`/`)
  }

  render() {
    const {
      classes,
      isMobileDevice,
      windowHeight,
      actionsBarIsFixed,
    } = this.props

    const { filterDraw } = this.state

    const { token } = store.getState()

    const {
      data: { validateToken, loading },
    } = this.props
    if (loading) {
      return (
        <Loader loadingText={"applying settings"} size={20} fontSize={12} />
      )
    }

    console.log("Actions.jsx State ", this.state)
    return (
      <div
        className={
          actionsBarIsFixed
            ? classes.FixedActionsWrapper
            : classes.ActionsWrapper
        }
        id="target">
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
        />

        <LoginModal
          isOpen={this.state.loginModalIsOpen}
          close={this.closeLoginModal}
        />

        {/* <ReactModal
          isOpen={this.state.loginModalIsOpen}
          onAfterOpen={this.afterOpenLoginModal}
          onClose={this.closeLoginModal}
          closeTimeoutMS={200}
          shouldCloseOnOverlayClick={true}
          contentLabel="Example Modal">
          <Button dense color="primary" onClick={this.closeLoginModal}>
            CLOSE
          </Button>

          <LoginForm />
        </ReactModal>

        <ReactModal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          closeTimeoutMS={200}
          shouldCloseOnOverlayClick={true}
          contentLabel="Example Modal">
          <Button dense color="primary" onClick={this.closeModal}>
            CLOSE
          </Button>
          <h2 ref={subtitle => (this.subtitle = subtitle)}>Hello</h2>
          <div>I am a modal</div>
          <div>ToDo:</div>
          <div>
            1 ) create a store on CodeExampleList and move the Modal there.
          </div>
          <div>
            2 ) CodeExampleList Will contain a currentData which will have data
            about one card
          </div>
          <div>
            3 ) On a card Button press send the data up to CodeExampleList
          </div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>

            <Paper className={classes.paper} children={<div>The body</div>} />
          </form>
        </ReactModal> */}
      </div>
    )
  }
}

const validateToken = gql`
  query validateToken {
    validateToken {
      Valid
      Message
      Code
    }
  }
`

const reduxWrapper = connect(
  state => ({
    actionsBarIsFixed: state.settings.actionsBarIsFixed,
    windowWidth: state.settings.windowWidth,
    windowHeight: state.settings.windowHeight,
    isMobileDevice: state.settings.isMobileDevice,
    user: state.user,
  }),
  dispatch => ({
    updateActionBarStatus: status => dispatch(updateActionBarStatus(status)),
  })
)

export default compose(
  graphql(validateToken),
  reduxWrapper,
  withStyles(styles)
)(Actions)
