import React, {Component} from 'react';
import CalendarBody from '../components/CalendarBody';
import {withApollo} from 'react-apollo'
import {gql, compose} from 'react-apollo';
// Connect Redux
import {connect} from "react-redux";
import {startFetchNewEvents, getNewEvents, filterEvents} from "../actions/eventsActions";
import {getSingleEventFulfilled, openSingleEventModal, closeSingleEventModal} from "../actions/currentEventActions";
import EventModal from '../components/Modals/EventModal';

class CalendarBodyContainer extends Component {

  constructor(props) {
    super(props);
    this.eventClick = this.eventClick.bind(this);
  }

  fetchEventsForMonth = async (startDate, endDate) => {
    // 1. Place Component into loading mode
    this.props.fetchAllEvents();
    // 2. Start Fetching the events
    await this.props.client.query({
      query: ALL_EVENTS_BETWEEN_QUERY,
      variables: {
        startDate: startDate,
        endDate: endDate
      }
    })
      .then((res) => {
        // 3. Events have been updated and loading mode will be false
        this.props.storeAllEvents(res.data.getEventsBetween);
        this.props.filterEvents();
      })
  };

  /**
   * ToDo: (Experimental)
   * Drive the modal state by what is in the router.
   * onClick() use browser router to push /event/${ID} to url
   * Maybe look to see if a component can tell what is in its route?
   * router able to detect when route changes? onChange component to do graphQL query?
   * onComponentMount for first visits for copy paste url. Will get the url and feed variable into its grapghQL query
   * NOTE: already using redux to get data for a singleEvent so detect browser url here.
   * Make modal open when /event/${ID} is detected in the browser
   * Also could use this type of patern for the /m/y for navigation
   *
   */
  eventClick = async (id, title) => {
    this.openEventModal();
    this.props.getEventData(id, title);
  };

  componentWillMount() {
    const {startDate, endDate} = this.props;
    this.fetchEventsForMonth(startDate, endDate).then(() => {
    });
  }

  componentWillUpdate(nextProps) {
    if (nextProps.currentDate !== this.props.currentDate) {
      let {startDate, endDate} = nextProps;
      this.fetchEventsForMonth(startDate, endDate).then(() => {
      });
    }
  }
s
  closeEventModal = () => {
    this.props.closeModal()
  };

  openEventModal = () => {
    this.props.openModal();
  };

  // shouldComponentUpdate(nextProps) {
  //   if(nextProps.currentDate !== this.props.currentDate) {
  //     return true
  //   }
  //   return false;
  // }

  render() {
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
    currentDate: state.header.currentDate,
    startDate: state.header.startOfMonth,
    endDate: state.header.endOfMonth,
    loadingEvents: state.event.fetching,
  }),
  dispatch => ({
    closeModal: () => dispatch(closeSingleEventModal()),
    openModal: () => dispatch(openSingleEventModal()),
    getEventData: (id, title) => dispatch(getSingleEventFulfilled(id, title)),
    fetchAllEvents: () => dispatch(startFetchNewEvents()),
    storeAllEvents: (events) => dispatch(getNewEvents(events)),
    filterEvents: () => dispatch(filterEvents())
  })
);

export default compose(
  withApollo,
  reduxWrapper,
)(CalendarBodyContainer);
