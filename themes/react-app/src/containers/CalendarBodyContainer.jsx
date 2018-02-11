import React, {Component} from 'react';
import CalendarBody from '../components/CalendarBody';
import { withApollo } from 'react-apollo'

import {withStyles} from 'material-ui/styles';
import {gql, compose} from 'react-apollo';

import {CircularProgress} from 'material-ui/Progress';


// Connect Redux
import {connect } from "react-redux";
import {startFetchNewEvents, getNewEvents} from "../actions/eventsActions";


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

  componentWillMount() {
    this.fetchEventsForMonth().then(() => {
      console.log('FINISHED fetch Events for month inside componentWillMount');
    });
  }

  componentDidMount() {

  }

  render() {

    const {classes} = this.props;

    const {events: {events, fetching}} = this.props;

    if (fetching) {
      return <div className={classes.loadingContainer}>
        <h2 className={classes.loadingText}>Loading Events for Calendar</h2>
        <CircularProgress className={classes.progress}/>
      </div>;
    }

    return (
      <CalendarBody currentDate={this.props.currentDate} events={events} eventClick={()=>console.log('lol')}/>
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
    token: state.token,
    header: state.header,
    events: state.event
  })
);

export default compose(
  withApollo,
  reduxWrapper,
  withStyles(styles)
)(CalendarBodyContainer);
