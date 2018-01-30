import React, {Component} from 'react';
import customTheme from './theme';
import CalendarMenu from './components/CalendarMenu';
import CalendarBody from './components/CalendarBody';

import {withStyles} from 'material-ui/styles';
import moment from 'moment';
import {gql, graphql, compose, buildSchema} from 'react-apollo';
import {execute} from 'graphql'; // ES6

import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import DisplayEventModal from './components/Modals/DisplayEventModal';
import './sass/App.scss';
import {CircularProgress} from 'material-ui/Progress';

// import LoginForm from './containers/JWTLoginForm';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as user from './actions/userActions';


// Connect Redux
import {connect } from "react-redux";
import {setUserName} from "./actions/userActions";
import {getNewEvents} from "./actions/eventsActions";
import {nextMonth, prevMonth} from './actions/headerActions';




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
    events: store.event
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
    this.fetchEventsForMonth();
  }

  componentDidMount() {
    // this.fetchEventsForMonth();
  }

  fetchEvents = async () => {

    await this.props.fetchEventsQuery.refetch({
      // variables: {
      //   linkId,
      // },
      // update: (store, { data: { vote } }) => {
      //   this.props.updateStoreAfterVote(store, vote, linkId)
      // },
    }) .then((response) => {
      console.log('GOOD A RESPONSE');
      console.log(response);
      this.setState({
        events: response.data.readEvents.edges
      });
      this.props.dispatch(getNewEvents(response.data.readEvents.edges));
      // dispatch({type: "getNewEvents", payload: response.data.readEvents.edges})
    });


    // this.state.client.query({query: EventQuery}).then((value) => {
    //   this.setState({events: value.data.readEvents.edges, loading: false})
    // });

    // await this.props.readEvents({
    //   variables: {
    //     linkId,
    //   },
    //   update: (store, { data: { vote } }) => {
    //     this.props.updateStoreAfterVote(store, vote, linkId)
    //   },
    // })
  };

  fetchEventsForMonth = async () => {

    await this.props.fetchEventsBetweenQuery.refetch({
      startDate: this.props.header.startOfMonth,
      endDate: this.props.header.endOfMonth
    })
      .then((response) =>{
        this.props.dispatch(getNewEvents(response.data.getEventsBetween));
      });

    console.group("runQuery");
    console.log(this.props);
    console.groupEnd();

  };

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

  nextMonthClick = async (e) => {
    e.preventDefault();
    await this.props.dispatch(nextMonth());
    this.fetchEventsForMonth();
  };

  previousMonthClick = async (e) => {
    e.preventDefault();
    await this.props.dispatch(prevMonth());
    this.fetchEventsForMonth();
  };

  render() {

    const {classes} = this.props;

    const {data: {validateToken, }, fetchEventsBetweenQuery: {loading, getEventsBetween}, events, header} = this.props;

    if (loading) {
      return <CircularProgress className={classes.progress}/>;
    }

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.Calendar}>
          <CalendarMenu currentDate={header.currentDate}
                        currentMonth={header.currentMonth}
                        currentYear={header.currentYear}
                        nextMonthClick={this.nextMonthClick}
                        previousMonthClick={this.previousMonthClick}
          />

          <CalendarBody currentDate={header.currentDate} events={events.events} eventClick={this.eventClick}/>

          <DisplayEventModal eventID={this.state.currentEvent.ID} isOpen={this.state.modalIsOpen}
                             eventData={this.state.currentEvent}/>

        </div>
      </MuiThemeProvider>
    )
  }
}

// export default App;
export default compose(
  graphql(validateToken),
  graphql(EventQuery, { name: 'fetchEventsQuery' }),
  graphql(EventsBetweenDateQuery, { name: 'fetchEventsBetweenQuery' }),
  withStyles(styles)
)(App);
