import React, {Component} from 'react';
import CalendarBody from '../components/CalendarBody';
import { withApollo } from 'react-apollo'
import {withStyles} from 'material-ui/styles';
import {gql, compose} from 'react-apollo';
import Loader from '../components/Loader';
// Connect Redux
import {connect } from "react-redux";
import {startFetchNewEvents, getNewEvents} from "../actions/eventsActions";
import { getSingleEventFulfilled} from "../actions/currentEventActions";
import EventModal from '../components/Modals/EventModal';

const styles = {
  loadingContainer: {
    display: 'flex',
    'align-items': 'center',
    'flex-direction': 'column',
    'height': '50%',
    'text-align': 'center',
    'margin': '40px',
    'padding': '10px',
  },
  loadingText: {
    'font-size': '18px'
  },
  progress: {
    margin: '40px'
  },
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
    events: store.event
  }
})
class CalendarBodyContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      eventModalIsOpen: false,
    };

    this.eventClick = this.eventClick.bind(this);
  }

  fetchEventsForMonth = async () => {

    const { header} = this.props;

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

  eventClick = async (id, title) => {
    await this.openEventModal();
    this.props.dispatch(getSingleEventFulfilled(id, title));
  };

  componentWillMount() {
    this.fetchEventsForMonth().then(() => {
      console.log('FINISHED fetch Events for month inside componentWillMount');
    });
  }

  closeEventModal = () => {
    this.setState({
      eventModalIsOpen: false
    })
  };

  openEventModal = () => {
    this.setState({
      eventModalIsOpen: true
    })
  };

  render() {

    const {classes, events: {events, fetching}, filter} = this.props;

    if (fetching) {
      return <Loader loadingText={"Loading Events for Calendar"} size={40} fontSize={22}/>;
    }

    let eventsArr = null;

    if (filter.length >= 1) {
      const newEvents = [];
      for (let event of events) {
        if (event.SecondaryTag) {
          if (filter.includes(event.SecondaryTag.Title)) {
            newEvents.push(event)
          }
        }
      }
      eventsArr = newEvents;
    } else {
      eventsArr = events
    }

    return (<div style={{height: '100%'}}>
      <CalendarBody
        currentDate={this.props.currentDate}
        events={eventsArr}
        eventClick={this.eventClick}/>
          <EventModal
            closeModal={() => this.closeEventModal()}
            isOpen={this.state.eventModalIsOpen}
            eventID={this.props.currentEvent.eventData.eventID}
            eventTitle={this.props.currentEvent.eventData.eventTitle} />
      </div>
    )
  }
}

export const ALL_EVENTS_BETWEEN_QUERY = gql`  
  query eventsBetween($startDate: String!, $endDate: String!) {
  getEventsBetween(StartDate: $startDate, EndDate: $endDate) {
    ID
    Title
    Date
    SecondaryTag {
      Title
    }
  }
}  
`;

const reduxWrapper = connect(
  state => ({
    header: state.header,
    events: state.event,
    currentEvent: state.currentEvent,
    filter: state.tags.filterTags
  })
);

export default compose(
  withApollo,
  reduxWrapper,
  withStyles(styles)
)(CalendarBodyContainer);
