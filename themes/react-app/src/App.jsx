import React, {Component} from 'react';
import CalendarMenu from './components/CalendarMenu';

import {withStyles} from 'material-ui/styles';
import moment from 'moment';
import {gql, graphql, compose} from 'react-apollo';

import DisplayEventModal from './components/Modals/DisplayEventModal';
import './sass/App.scss';

import CalendarBodyContainer from './containers/CalendarBodyContainer';
import CreateEventContainer from './containers/CreateEventContainer'
import SearchContainer from './containers/SearchContainer';

// Connect Redux
import {connect} from "react-redux";
import {nextMonth, prevMonth} from './actions/headerActions';

import {ALL_EVENTS_BETWEEN_QUERY} from './containers/CalendarBodyContainer';
import {getNewEvents, startFetchNewEvents} from "./actions/eventsActions";
import {withApollo} from "react-apollo/index";

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {withRouter} from "react-router";
import Loader from './components/Loader';

import DynamicTheme from "./dynamicTheme";
import {MuiThemeProvider} from 'material-ui/styles';


const validateToken = gql`
query validateToken {
    validateToken {
      Valid
      Message
      Code
    }
}`;

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

const styles = {
  Calendar: {
    'width': '100%',
    'height': '100%',
  },
  card: {
    'minWidth': 'min-content',
    'maxWidth': '300px',
    'flex-shrink': '0',
    'margin': '10px',
  },
  media: {
    height: 200,
  }
};

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      currentDate: moment(),
      currentMonth: null,
      currentYear: null,
      monthName: null,
      modalIsOpen: false,
      open: false,
      currentEvent: {
        ID: 1000,
        Title: null
      }
    };

    this.nextMonthClick = this.nextMonthClick.bind(this);
    this.previousMonthClick = this.previousMonthClick.bind(this);
    // Modal state
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentDidMount() {

  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  handleToggle() {
    this.setState({
      open: !this.state.open
    })
  }

  handleClose() {
    this.setState({
      open: false
    })
  }

  nextMonthClick = (e) => {
    e.preventDefault();
    this.props.dispatch(nextMonth());
    this.fetchEventsForMonth();
  };

  previousMonthClick = async (e) => {
    e.preventDefault();
    this.props.dispatch(prevMonth());

    this.fetchEventsForMonth().then(() => {
      //this.forceUpdate()
    });
  };

  fetchEventsForMonth = async () => {

    // 1. Place Component into loading mode
    this.props.dispatch(startFetchNewEvents());

    // 2. Start Fetching the events
    this.props.client.query({
      query: ALL_EVENTS_BETWEEN_QUERY,
      variables: {
        startDate: this.props.header.startOfMonth,
        endDate: this.props.header.endOfMonth
      }
    })
      .then((res) => {
        // 3. Events have been updated and loading mode will be false
        this.props.dispatch(getNewEvents(res.data.getEventsBetween));
        return res.data.getEventsBetween
      })

  };


  render() {

    const CalendarBody = (props) => {
      return (
        <CalendarBodyContainer
          currentDate={header.currentDate}
          startDate={header.startOfMonth}
          endDate={header.endOfMonth}
        />
      );
    };

    const {classes} = this.props;

    const {data: {validateToken, loading, getAppSettings}, header} = this.props;

    if (loading) {
      return <Loader loadingText={'Securing App'} size={40} fontSize={22}/>;
    }

    // Get app settings from query and apply to MUITheme
    const AppSettings = getAppSettings[0];
    const {HappLogo, ClientLogo} = AppSettings;
    const dynamicTheme = DynamicTheme(AppSettings);

    return (
      <MuiThemeProvider theme={dynamicTheme}>
        <div className={classes.Calendar}>
          <CalendarMenu currentDate={header.currentDate}
                        happLogo={HappLogo}
                        clientLogo={ClientLogo}
                        currentMonth={header.currentMonth}
                        currentYear={header.currentYear}
                        nextMonthClick={this.nextMonthClick}
                        previousMonthClick={this.previousMonthClick}
          />

          <Switch>
            <Route exact path='/' component={CalendarBody}/>
            <Route exact path='/create' component={CreateEventContainer}/>
            <Route exact path='/search' component={SearchContainer}/>
          </Switch>

          <DisplayEventModal eventID={this.state.currentEvent.ID} isOpen={this.state.modalIsOpen}
                             eventData={this.state.currentEvent}/>

        </div>
      </MuiThemeProvider>
    )
  }
}

const reduxWrapper = connect(
  state => ({
    token: state.token,
    header: state.header,
  })
);

export default withRouter(compose(
  reduxWrapper,
  graphql(validateToken),
  graphql(APP_SETTINGS_QUERY),
  withStyles(styles)
)(App));