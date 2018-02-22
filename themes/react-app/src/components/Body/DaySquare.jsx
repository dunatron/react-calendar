import React, {Component} from 'react';
import {withStyles} from 'material-ui/styles';
import {connect} from "react-redux";
import {compose, withApollo} from "react-apollo/index";
import { fade} from 'material-ui/styles/colorManipulator';

const styles = theme => ({
  dayNumber: {
    'line-height': '50px',
    'font-size': '26px',
    'text-align': 'center',
    'top': '0',
    'left': '0',
    'padding': '2px',
    //background-color: rgba(255, 255, 255, 0.2);
    'background-color': fade(theme.palette.primary.main, 0.8),
    'color': theme.palette.common.white,
    'min-width': '26px',
    'transition': 'opacity 0.5s ease-in-out',
    'z-index': 1
  },
  innerSquare: {
    'height': 'inherit',
    'padding': '0',
    'overflow-y': 'hidden',
    'overflow-x': 'hidden',
    'position': 'relative',
    'margin': '0 15px 0 0',
  },
  [theme.breakpoints.up('md')]: {
    dayNumber: {
      'position': 'absolute',
      'font-size': '13px',
      'line-height': '20px',
    },
  },
});

class DaySquare extends Component {

  constructor(props) {
    super(props)

    const {currentDate} = props;

    this.state = {
      events: [props.events]
    };

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      events: [nextProps.events]
    })
  }

  renderEvents() {
    const {events, classes, dayNumber, filter} = this.props;

    // Filter has been set, filter the events
    if (filter.length >= 1) {
      const newEvents = [];
      for (let event of events) {
        if (event.SecondaryTag) {
          if (filter.includes(event.SecondaryTag.Title)) {
            newEvents.push(event)
          }
        }
      }
      const listItems = newEvents.map((d) =>
          <div
            className="event_card" key={d.ID}
            onClick={() => this.props.eventClick(d.ID, d.Title)}
          >
            {d.Title}
          </div>);
      return (
        <div className="events_wrapper">
          {listItems}
        </div>
      );
    }

    // Filter has not been set, return all events
    const listItems = events.map((d) =>
        <div
          className="event_card" key={d.ID}
          onClick={() => this.props.eventClick(d.ID, d.Title)}
        >
          {d.Title}
        </div>);

    return (
      <div className="events_wrapper">
        {listItems}
      </div>
    );
  }

  render() {

    const {classes} = this.props;

    return (
      <div className={this.props.className}>
        <span className={classes.dayNumber}>{this.props.dayNumber}</span>
        <div className={classes.innerSquare}>
          {this.renderEvents()}
        </div>
      </div>
    );
  }
}

const reduxWrapper = connect(
  state => ({
    filter: state.tags.filterTags
  })
);

export default compose(
  withStyles(styles),
  withApollo,
  reduxWrapper,
)(DaySquare);
