import React, {Component} from 'react';
import CalendarBody from '../components/CalendarBody';
import {withApollo} from 'react-apollo'
import {gql, compose} from 'react-apollo';
import Loader from '../components/Loader';
// Connect Redux
import {connect} from "react-redux";
import {startFetchNewEvents, getNewEvents} from "../actions/eventsActions";
import {getSingleEventFulfilled, openSingleEventModal, closeSingleEventModal} from "../actions/currentEventActions";
import EventModal from '../components/Modals/EventModal';


class CalendarBodyContainer extends Component {

  constructor(props) {
    super(props);

    // this.state = {
    //   eventModalIsOpen: false,
    // };
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
      })
  };

  eventClick = async (id, title) => {
    this.openEventModal();
    this.props.dispatch(getSingleEventFulfilled(id, title));
  };

  componentWillMount() {
    this.fetchEventsForMonth().then(() => {});
  }

  closeEventModal = () => {
    this.props.dispatch(closeSingleEventModal());
    // this.setState({
    //   eventModalIsOpen: false
    // })
  };

  openEventModal = () => {
    this.props.dispatch(openSingleEventModal());
    // this.setState({
    //   eventModalIsOpen: true
    // })
  };

  render() {
    console.log('CalendarBodyContainer Render');
    const {events: {events, fetching}, filter} = this.props;

    if (fetching) {
      return <Loader loadingText={"Loading Events for Calendar"} size={40} fontSize={22}/>;
    }

    // ToDo: this can be done better and will help with performance
    let newEventsArray = null;
    if (filter.length >= 1) {
      newEventsArray = events.filter(function (el) {
        return filter.includes(el.SecondaryTag.Title)
      });
    } else {
      newEventsArray = events;
    }


    return (<div style={{height: '100%'}}>
        <CalendarBody
          currentDate={this.props.currentDate}
          events={newEventsArray}
          eventClick={this.eventClick}/>
        <EventModal closeModal={() => this.closeEventModal()} />
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
    filter: state.tags.filterTags
  })
);

export default compose(
  withApollo,
  reduxWrapper,
)(CalendarBodyContainer);
