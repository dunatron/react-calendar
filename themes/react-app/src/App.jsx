import React, {Component} from 'react';
import customTheme from './theme';
import CalendarMenu from './components/CalendarMenu';
import CalendarBody from './components/CalendarBody';

import {withStyles} from 'material-ui/styles';
import moment from 'moment';
import {gql, graphql, compose, buildSchema} from 'react-apollo';

import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import DisplayEventModal from './components/Modals/DisplayEventModal';
import './sass/App.scss';

// import LoginForm from './containers/JWTLoginForm';
import * as user from './actions/userActions';
import CalendarBodyContainer from './containers/CalendarBodyContainer';
import CreateEventContainer from './containers/CreateEventContainer'

// Connect Redux
import {connect } from "react-redux";
import {nextMonth, prevMonth} from './actions/headerActions';

import {ALL_EVENTS_BETWEEN_QUERY} from './containers/CalendarBodyContainer';
import {getNewEvents, startFetchNewEvents} from "./actions/eventsActions";
import {withApollo} from "react-apollo/index";

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {withRouter} from "react-router";

/**
 *
 * https://material-ui-next.com/demos/buttons/
 */

const validateToken = gql`
query validateToken {
    validateToken {
      Valid
      Message
      Code
    }
}`;

const EventQuery = gql`
query readEvents {
  readEvents {
    edges {
      node {
        ID
        ...EventOverview
      }
    }
  }
}
fragment EventOverview on Event {
      Title
      Date
      Owner {
        Name
        Surname
      }
      SecondaryTag {
        Title
        Description
      }
    }
`;

const EventsBetweenDateQuery = gql`
  query eventsBetween($startDate: String!, $endDate: String!) {
  getEventsBetween(StartDate: $startDate, EndDate: $endDate) {
    ID
    Title
    Date
  }
}
`;


const theme = createMuiTheme(customTheme);

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

@connect((store) => {
  return {
    header: store.header,
    user: store.user,
  }
})
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
    this.eventClick = this.eventClick.bind(this);
    // Modal state
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  componentWillMount() {
    // This is the only lifecycle hook called on server rendering.
    // this.fetchEventsForMonth();
  }

  componentDidMount() {
    // this.fetchEventsForMonth();
  }

  eventClick(id, title) {
    this.setState({
      currentEvent: {
        ID: id,
        Title: title
      }
    });
    this.openModal();
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
    await this.props.dispatch(prevMonth());

    this.fetchEventsForMonth().then(() => {
      //this.forceUpdate()
    });
  };

  fetchEventsForMonth = async () => {

    // 1. Place Component into loading mode
    await this.props.dispatch(startFetchNewEvents());

    // 2. Start Fetching the events
    await this.props.client.query({
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
          eventClick={this.eventClick}
        />
      );
    };

    const {classes} = this.props;

    const {data: {validateToken }, header} = this.props;

    // if (loading) {
    //   return <CircularProgress className={classes.progress}/>;
    // }

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.Calendar}>
          <CalendarMenu currentDate={header.currentDate}
                        currentMonth={header.currentMonth}
                        currentYear={header.currentYear}
                        nextMonthClick={this.nextMonthClick}
                        previousMonthClick={this.previousMonthClick}
          />

          <Switch>
            <Route exact path='/' component={CalendarBody}/>
            <Route exact path='/create' component={CreateEventContainer}/>
            <Route exact path='/login' component={CalendarBody}/>
            <Route exact path='/search' component={CalendarBody}/>
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

// // export default App;
// export default compose(
//   graphql(validateToken),
//   withApollo,
//   reduxWrapper,
//   withStyles(styles)
// )(App);

export default withRouter(compose(
  reduxWrapper,
  graphql(validateToken),
  withStyles(styles)
)(App));