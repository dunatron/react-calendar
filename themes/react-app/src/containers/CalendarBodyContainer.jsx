import React, {Component} from 'react';
import CalendarBody from '../components/CalendarBody';
import {withApollo} from 'react-apollo'
import {gql, compose} from 'react-apollo';
import Loader from '../components/Loader';
// Connect Redux
import {connect} from "react-redux";
import {startFetchNewEvents, getNewEvents, filterEvents} from "../actions/eventsActions";
import {getSingleEventFulfilled, openSingleEventModal, closeSingleEventModal} from "../actions/currentEventActions";
import EventModal from '../components/Modals/EventModal';

/**
 * 1. container class that contains the following data: events, filter, currentDate
 * 2. It will essentially render the calendar body.
 * 3. The biggest thing here is when a tag changes It will re-render the calendar body,
 *  this causes a bit of a performance issue when we re-render, especially if there is a large number of events.
 *  4. The biggest "lag" is when we have filters applied and we uncheck the last filter as to re-render the calendar again with all events
 *
 *  Any sort of performance optimization around this would be fantastic
 */
class CalendarBodyContainer extends Component {

  constructor(props) {
    super(props);
    this.eventClick = this.eventClick.bind(this);
  }

  fetchEventsForMonth = async () => {
    const {header} = this.props;
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
        this.props.dispatch(filterEvents());
      })
  };

  eventClick = async (id, title) => {
    this.openEventModal();
    this.props.dispatch(getSingleEventFulfilled(id, title));
  };

  componentWillMount() {
    this.fetchEventsForMonth().then(() => {
    });
  }

  closeEventModal = () => {
    this.props.dispatch(closeSingleEventModal());
  };

  openEventModal = () => {
    this.props.dispatch(openSingleEventModal());
  };

  shouldComponentUpdate(nextProps) {
    return (nextProps.loadingEvents !== this.props.loadingEvents)
      || (nextProps.header.currentDate !== this.props.header.currentDate);
  }

  render() {
    console.log('CalendarBodyContainer render');
    const {loadingEvents} = this.props;
    if (loadingEvents) {
      return <Loader loadingText={"Loading Events for Calendar"} size={40} fontSize={22}/>;
    }

    return (<div style={{height: '100%'}}>
        <CalendarBody
          currentDate={this.props.currentDate}
          eventClick={this.eventClick}/>
        <EventModal closeModal={() => this.closeEventModal()}/>
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
    filter: state.tags.filterTags,
    loadingEvents: state.event.fetching
  })
);

export default compose(
  withApollo,
  reduxWrapper,
)(CalendarBodyContainer);
