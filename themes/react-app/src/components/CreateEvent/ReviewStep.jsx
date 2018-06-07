import React, {Component, Fragment} from 'react';
import { withApollo, compose } from 'react-apollo'
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import {connect} from "react-redux";
import {addImage, removeImage} from '../../actions/createEventActions'
import EventCard from '../Events/EventCard';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
});

class ReviewStep extends Component {

  render() {
    const { classes,
      NewEvent: {
        AccessType,
        Approved,
        DateTimes,
        Description,
        EventImages,
        Finish,
        Free,
        Lat,
        LocationText,
        Lon,
        Owner,
        Restriction,
        SecondaryTag,
        SpecEntry,
        Start,
        TicketPhone,
        TicketUrl,
        Tickets,
        Title,
        Venue,
        Website

    }} = this.props

    const eventObjects = []
    DateTimes.map((date, idx) => {
      let newEvent = {
        AccessType,
        Approved,
        Date: date.date,
        Description,
        EventImages,
        Finish: date.finish,
        Free,
        Lat,
        LocationText,
        Lon,
        Owner,
        Restriction,
        SecondaryTag,
        SpecEntry,
        Start: date.start,
        TicketPhone,
        TicketUrl,
        Thumbnail: EventImages[0].data,
        IsEventFindaEvent: false,
        Tickets,
        Title,
        Venue,
        Website
      }
      eventObjects.push(newEvent)
    })


    return (
      <div className={classes.container}>
        {eventObjects.map((event, idx) => {
          return <EventCard eventObject={event} key={idx} />
        })}
      </div>
    );
  }

}

ReviewStep.propTypes = {
  classes: PropTypes.object,
};

const reduxWrapper = connect(
  state => ({
    NewEvent: state.createEvent,
  }),
  dispatch => ({

  })
);

export default compose(
  withApollo,
  reduxWrapper,
  withStyles(styles)
)(ReviewStep);









